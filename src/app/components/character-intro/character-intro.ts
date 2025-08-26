import { Component, computed, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { CHARACTER_INTRO_CONTENT } from './character-intro-constants';

@Component({
  standalone: true,
  selector: 'character-intro',
  imports: [],
  templateUrl: './character-intro.html',
  styleUrl: './character-intro.scss'
})
export class CharacterIntro {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => CHARACTER_INTRO_CONTENT[this.appService.country()]);
}
