import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CULTURAL_LOGO_INTRO_CONTENT } from './cultural-logo-intro.constants';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  selector: 'cultural-logo-intro',
  imports: [],
  templateUrl: './cultural-logo-intro.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cultural-logo-intro.scss'
})
export class CulturalLogoIntro {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => CULTURAL_LOGO_INTRO_CONTENT[this.appService.country()]);

  public playTiltAndMoveShake(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.add('tilt-n-move-shaking');
    target.addEventListener('animationend', () => {
      target.classList.remove('tilt-n-move-shaking');
    }, { once: true });
  }
}
