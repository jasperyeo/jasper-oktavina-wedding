import { Component, computed, inject, OnInit, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Invitation } from './components/invitation/invitation';
import { AppService } from './app.service';
import { HEADER_AND_FOOTER } from './app.constants';

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
  private readonly _router: Router = inject(Router);
  private readonly _appService: AppService = inject(AppService);
  protected readonly content = computed(() => {
    return {
      ...HEADER_AND_FOOTER
    };
  });
  private readonly _langMap: Record<string, string> = {
    id: 'id-ID',
    sg: 'en-SG'
  };
  protected country: WritableSignal<string> = signal<string>('');
  protected opened: WritableSignal<boolean> = signal<boolean>(false);

  public ngOnInit(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const country: string = event.urlAfterRedirects.substring(1);
      this.country.set(country);
      this._appService.country.set(this.country());
      this._document.documentElement.lang = this._langMap[this.country()];
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
