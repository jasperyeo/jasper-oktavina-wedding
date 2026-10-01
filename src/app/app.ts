import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, PRIMARY_OUTLET, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Invitation } from './components/invitation/invitation';
import { AppService } from './app.service';
import { Country, DEFAULT_COUNTRY, HEADER_AND_FOOTER } from './app.constants';

const LANG_MAP: Record<Country, string> = {
  sg: 'en-SG',
  id: 'id-ID'
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Invitation
],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private readonly _document: Document = inject(DOCUMENT);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _router: Router = inject(Router);
  private readonly _appService: AppService = inject(AppService);
  protected readonly content = HEADER_AND_FOOTER;
  protected readonly country: WritableSignal<Country> = signal<Country>(DEFAULT_COUNTRY);
  protected readonly opened: WritableSignal<boolean> = signal<boolean>(false);

  public ngOnInit(): void {
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(event => {
      const countrySegment = this._router.parseUrl(event.urlAfterRedirects)
        .root.children[PRIMARY_OUTLET]?.segments[0]?.path;
      if (countrySegment !== 'sg' && countrySegment !== 'id') {
        return;
      }
      const country: Country = countrySegment;
      this.country.set(country);
      this._appService.country.set(this.country());
      this._document.documentElement.lang = LANG_MAP[this.country()];
    });
    this._document.documentElement.style.overflow = 'hidden';
  }

  protected open(): void {
    this.opened.set(true);
    this._appService.invitationOpened.set(true);
    this._document.documentElement.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }
}
