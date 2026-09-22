import { Component, computed, HostBinding, input, InputSignal, output, OutputEmitterRef, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Button } from 'primeng/button';
import { INVITATION_CONTENT } from './invitation.constants';
import { CHARACTER_INTRO_CONTENT } from '../character-intro/character-intro.constants';
import { CONTENT_PAGE_CONTENTS } from '../../pages/content-page/content-page.constants';
import { HEADER_AND_FOOTER } from '../../app.constants';

@Component({
  standalone: true,
  selector: 'invitation',
  imports: [
    AnimateOnScrollModule,
    Button
  ],
  templateUrl: './invitation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './invitation.scss'
})
export class Invitation {

  public readonly country: InputSignal<string> = input<string>('sg');
  public readonly content = computed(() => {
    return {
      ...INVITATION_CONTENT[this.country()],
      ...CHARACTER_INTRO_CONTENT[this.country()],
      ...HEADER_AND_FOOTER,
      ...CONTENT_PAGE_CONTENTS
    }
  });
  public onOpen: OutputEmitterRef<void> = output<void>();
  // @HostBinding('class.opened') public opened: boolean = false;
  @HostBinding('class.id') classId: boolean = this.country() === 'id';
  @HostBinding('class.sg') classSg: boolean = this.country() === 'sg';

  constructor() {
    document.body.style.overflow = 'hidden';
  }

  public openInvitation(): void {
    document.body.style.overflow = 'unset';
    this.onOpen.emit();
    // this.opened = true;
    const audio: HTMLAudioElement | null = document.querySelector("audio");
    if (audio) {
      audio.volume = 0.2;
      audio.play();
    } 
  }
}
