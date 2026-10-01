import { Component, computed, effect, ElementRef, HostListener, inject, signal, WritableSignal, ChangeDetectionStrategy, viewChild, Signal } from '@angular/core';
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
export class MusicPlayer {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => MUSIC_PLAYER_CONTENT[this.appService.country()]);
  public isPlaying: WritableSignal<boolean> = signal<boolean>(true);
  protected readonly musicPlayer: Signal<ElementRef<HTMLAudioElement> | undefined> = viewChild<ElementRef<HTMLAudioElement>>('musicplayer');
  private readonly playbackEffect = effect(() => {
    if (!this.appService.invitationOpened()) {
      return;
    }

    const audio: HTMLAudioElement | undefined = this.musicPlayer()?.nativeElement;
    if (!audio) {
      return;
    }

    audio.volume = 0.2;
    void audio.play().then(() => {
      this.isPlaying.set(true);
    }).catch(() => {
      this.isPlaying.set(false);
    });
  });

  public toggleMusic(): void {
    const audio: HTMLAudioElement | undefined = this.musicPlayer()?.nativeElement;
    if (audio?.paused) {
      void audio.play().then(() => {
        this.isPlaying.set(true);
      }).catch(() => this.isPlaying.set(false));
    } else if (audio) {
      audio.pause();
      this.isPlaying.set(false);
    }
  }

  @HostListener('document:visibilitychange')
  public onVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.musicPlayer()?.nativeElement?.pause();
      this.isPlaying.set(false);
    } else if (this.appService.invitationOpened()) {
      const audio: HTMLAudioElement | undefined = this.musicPlayer()?.nativeElement;
      if (!audio) {
        return;
      }
      void audio.play().then(() => {
        this.isPlaying.set(true);
      }).catch(() => this.isPlaying.set(false));
    }
  }
}
