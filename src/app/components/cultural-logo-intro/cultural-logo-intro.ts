import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CULTURAL_LOGO_INTRO_CONTENT } from './cultural-logo-intro.constants';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  selector: 'cultural-logo-intro',
  imports: [],
  templateUrl: './cultural-logo-intro.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cultural-logo-intro.scss'
})
export class CulturalLogoIntro {

  protected readonly appService: AppService = inject(AppService);
  protected readonly content = computed(() => CULTURAL_LOGO_INTRO_CONTENT[this.appService.country()]);

  protected playTiltAndMoveShake(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.add('tilt-n-move-shaking');
    target.addEventListener('animationend', () => {
      target.classList.remove('tilt-n-move-shaking');
    }, { once: true });
  }
}
