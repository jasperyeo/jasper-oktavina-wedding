import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Invitation } from './components/invitation/invitation';
import { AppService } from './app.service';
import { HEART_RAIN_ATTRIBUTES, HEADER_AND_FOOTER } from './app.constants';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    Invitation
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private readonly _document: Document = inject(DOCUMENT);
  private readonly _router: Router = inject(Router);
  private readonly _appService: AppService = inject(AppService);
  public readonly content = computed(() => {
    return {
      ...HEADER_AND_FOOTER,
      ...HEART_RAIN_ATTRIBUTES
    };
  });
  private readonly _langMap: any = {
    id: 'id-ID',
    sg: 'en-SG'
  };
  public country: WritableSignal<string> = signal<string>('');
  public opened: WritableSignal<boolean> = signal<boolean>(false);
  public readonly imageUrl: string = HEART_RAIN_ATTRIBUTES.IMAGE_URL;
  public container: HTMLElement | null = document.getElementById(HEART_RAIN_ATTRIBUTES.CONTAINER_CLASS);

  public ngOnInit(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const country: string = event.urlAfterRedirects.substring(1);
      this.country.set(!this._langMap[country] ? 'id' : country);
      this._appService.country.set(this.country());
      this._document.documentElement.lang = this._langMap[this.country()];
    });
  }

  public open(): void {
    this.opened.set(true);
    this.container = document.getElementById(HEART_RAIN_ATTRIBUTES.CONTAINER_CLASS)!;
    this.startRain();
    window.scrollTo(0, 0);
  }

  private _createHeart(): void {
    const heart = document.createElement('img');
    heart.src = this.imageUrl;
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.opacity = `${Math.random() * 0.5}`;
    heart.style.filter = `blur(${Math.random() * 4}px)`;
    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = `${duration}s`;
    this.container!.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  public startRain(): void {
    setInterval(() => {
      this._createHeart();
    }, 1000);
  }
}
