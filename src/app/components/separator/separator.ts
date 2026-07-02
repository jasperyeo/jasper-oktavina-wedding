import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { SEPARATOR_CONTENT } from './separator.constants';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  selector: 'separator',
  imports: [],
  templateUrl: './separator.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './separator.scss'
})
export class Separator {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => SEPARATOR_CONTENT);
}
