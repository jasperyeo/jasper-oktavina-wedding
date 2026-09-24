import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AppService } from '../../app.service';
import { CHARACTER_INTRO_CONTENT, PETALS } from './character-intro.constants';

interface HeartEffect {
  id: number;
  left: number;
  top: number;
  drift: number;
}

@Component({
  standalone: true,
  selector: 'character-intro',
  imports: [],
  templateUrl: './character-intro.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './character-intro.scss'
})
export class CharacterIntro {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => CHARACTER_INTRO_CONTENT[this.appService.country()]);
  public readonly petals: readonly number[] = PETALS;
  public readonly hearts = signal<readonly HeartEffect[]>([]);
  private heartId: number = 0;

  public emitHeart(event: PointerEvent): void {
    const arch = event.currentTarget as HTMLElement;
    const bounds = arch.getBoundingClientRect();
    const heart: HeartEffect = {
      id: ++this.heartId,
      left: ((event.clientX - bounds.left) / bounds.width) * 100,
      top: ((event.clientY - bounds.top) / bounds.height) * 100,
      drift: Math.round((Math.random() - 0.5) * 80)
    };

    this.hearts.update(hearts => [...hearts, heart]);
    window.setTimeout(() => {
      this.hearts.update(hearts => hearts.filter(currentHeart => currentHeart.id !== heart.id));
    }, 1400);
  }
}
