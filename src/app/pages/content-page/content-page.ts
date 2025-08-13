import { Component } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CulturalLogoIntro } from '../../components/cultural-logo-intro/cultural-logo-intro';
import { CharacterIntro } from '../../components/character-intro/character-intro';
import { ParentsInfo } from '../../components/parents-info/parents-info';
import { EventInfo } from '../../components/event-info/event-info';
import { Separator } from '../../components/separator/separator';
import { Location } from '../../components/location/location';
import { Countdown } from '../../components/countdown/countdown';
import { MusicPlayer } from '../../components/music-player/music-player';

@Component({
  standalone: true,
  selector: 'content-page',
  imports: [
    AnimateOnScrollModule,
    CulturalLogoIntro,
    CharacterIntro,
    ParentsInfo,
    EventInfo,
    Separator,
    Location,
    Countdown,
    MusicPlayer,
  ],
  templateUrl: './content-page.html',
  styleUrl: './content-page.scss'
})
export class ContentPage {

}
