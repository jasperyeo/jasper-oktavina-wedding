import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CulturalLogoIntro } from './components/cultural-logo-intro/cultural-logo-intro';
import { CharacterIntro } from './components/character-intro/character-intro';
import { ParentsInfo } from './components/parents-info/parents-info';
import { EventInfo } from './components/event-info/event-info';
import { Separator } from './components/separator/separator';
import { Location } from './components/location/location';
import { Countdown } from './components/countdown/countdown';
import { MusicPlayer } from './components/music-player/music-player';
import { Invitation } from './components/invitation/invitation';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    CulturalLogoIntro,
    CharacterIntro,
    ParentsInfo,
    EventInfo,
    Separator,
    Location,
    Countdown,
    MusicPlayer,
    Invitation,
    AnimateOnScrollModule
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('Jasper & Oktavina Wedding');
  public opened: WritableSignal<boolean> = signal<boolean>(false);

  public open(): void {
    this.opened.set(true);
    window.scrollTo(0, 0);
  }
}
