import { Component, output, OutputEmitterRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'invitation',
  imports: [
    ButtonModule
  ],
  templateUrl: './invitation.html',
  styleUrl: './invitation.scss'
})
export class Invitation {

  constructor() {
    document.body.style.overflow = 'hidden';
  }

  public onOpen: OutputEmitterRef<void> = output<void>();

  public openInvitation(): void {
    document.body.style.overflow = 'unset';
    this.onOpen.emit();
    const audio: HTMLAudioElement | null = document.querySelector("audio");
    if (audio) {
      audio.volume = 0.2;
      audio.play();
    } 
  }
}
