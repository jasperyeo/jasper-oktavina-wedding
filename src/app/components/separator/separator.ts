import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SEPARATOR_CONTENT } from './separator.constants';

@Component({
  standalone: true,
  selector: 'separator',
  imports: [],
  templateUrl: './separator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './separator.scss'
})
export class Separator {

  protected readonly content = SEPARATOR_CONTENT;
}
