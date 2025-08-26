import { Component, computed, inject } from '@angular/core';
import { LOGO_INTRO_CONTENT } from './cultural-logo-intro.constants';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  selector: 'cultural-logo-intro',
  imports: [],
  templateUrl: './cultural-logo-intro.html',
  styleUrl: './cultural-logo-intro.scss'
})
export class CulturalLogoIntro {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => LOGO_INTRO_CONTENT[this.appService.country()]);
}
