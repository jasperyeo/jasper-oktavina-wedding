import { AfterViewInit, Component, computed, HostListener, inject, signal, WritableSignal, ChangeDetectionStrategy, viewChild, ElementRef, Signal } from '@angular/core';
import { Button } from 'primeng/button';
import { AppService } from '../../app.service';
import { MUSIC_PLAYER_CONTENT } from './music-player.constants';

@Component({
  standalone: true,
  selector: 'music-player',
  imports: [ Button ],
  templateUrl: './music-player.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './music-player.scss'
})
export class MusicPlayer implements AfterViewInit {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => MUSIC_PLAYER_CONTENT[this.appService.country()]);
  public isPlaying: WritableSignal<boolean> = signal<boolean>(true);
  protected readonly musicPlayer: Signal<ElementRef<HTMLAudioElement>> = viewChild.required<ElementRef<HTMLAudioElement>>('musicplayer');

  public ngAfterViewInit(): void {
    this.musicPlayer()?.nativeElement?.play().then(() => {
      this.isPlaying.set(true);
    });
  }

  public toggleMusic(): void {
    if (this.musicPlayer()?.nativeElement?.paused) {
      this.musicPlayer()?.nativeElement?.play().then(() => {
        this.isPlaying.set(true);
      });
    } else {
      this.musicPlayer()?.nativeElement?.pause();
      this.isPlaying.set(false);
    }
  }

  @HostListener('document:visibilitychange')
  public onVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.musicPlayer()?.nativeElement?.pause();
      this.isPlaying.set(false);
    } else {
      this.musicPlayer()?.nativeElement?.play().then(() => {
        this.isPlaying.set(true);
      });
    }
  }
}
