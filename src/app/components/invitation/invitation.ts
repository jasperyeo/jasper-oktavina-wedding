import { Component, computed, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { INVITATION_CONTENT } from './invitation.constants';

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

  public readonly ctry: InputSignal<string> = input<string>('id');
  public readonly content = computed(() => INVITATION_CONTENT[this.ctry()]);
  public onOpen: OutputEmitterRef<void> = output<void>();

  constructor() {
    document.body.style.overflow = 'hidden';
  }

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
