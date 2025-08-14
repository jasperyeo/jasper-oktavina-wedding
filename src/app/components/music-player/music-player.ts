import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'music-player',
  imports: [
    ButtonModule
  ],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss'
})
export class MusicPlayer {

  public isPlaying: WritableSignal<boolean> = signal<boolean>(true);

  public toggleMusic(): void {
    const musicPlayer: HTMLAudioElement | null = document.getElementById('music-player') as HTMLAudioElement;
    if (musicPlayer?.paused) {
      musicPlayer?.play();
      this.isPlaying.set(true);
    } else {
      musicPlayer?.pause();
      this.isPlaying.set(false);
    }
  }
}
