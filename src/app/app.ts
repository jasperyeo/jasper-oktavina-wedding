import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Invitation } from './components/invitation/invitation';

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
  private readonly _langMap: any = {
    id: 'id-ID',
    sg: 'en-SG'
  };
  public ctry: WritableSignal<string> = signal<string>('');
  public opened: WritableSignal<boolean> = signal<boolean>(false);
  public readonly imageUrl: string = 'assets/images/mini-heart.gif';
  public container: HTMLElement | null = document.getElementById('rain-container');

  public ngOnInit(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const ctry: string = event.urlAfterRedirects.substring(1);
      this.ctry.set(!this._langMap[ctry] ? 'id' : ctry);
      this._document.documentElement.lang = this._langMap[this.ctry()];
    });
  }

  public open(): void {
    this.opened.set(true);
    this.container = document.getElementById('rain-container')!;
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
