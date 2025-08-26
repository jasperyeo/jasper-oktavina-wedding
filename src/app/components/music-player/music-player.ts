import { AfterViewInit, Component, computed, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../app.service';
import { MUSIC_PLAYER_CONTENT } from './music-player.constants';

@Component({
  standalone: true,
  selector: 'music-player',
  imports: [
    ButtonModule
  ],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss'
})
export class MusicPlayer implements AfterViewInit {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => MUSIC_PLAYER_CONTENT[this.appService.country()]);
  public isPlaying: WritableSignal<boolean> = signal<boolean>(true);
  protected musicPlayer: WritableSignal<HTMLAudioElement | null> = signal<HTMLAudioElement | null>(null);

  public ngAfterViewInit(): void {
    this.musicPlayer.set(document.getElementById('music-player') as HTMLAudioElement);
  }

  public toggleMusic(): void {
    if (this.musicPlayer()?.paused) {
      this.musicPlayer()?.play();
      this.isPlaying.set(true);
    } else {
      this.musicPlayer()?.pause();
      this.isPlaying.set(false);
    }
  }

  @HostListener('document:visibilitychange')
  public onVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.musicPlayer()?.pause();
      this.isPlaying.set(false);
    } else {
      this.musicPlayer()?.play();
      this.isPlaying.set(true);
    }
  }
}
