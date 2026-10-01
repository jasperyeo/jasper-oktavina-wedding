import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GETTING_HERE_CONTENT } from './getting-here.constants';

@Component({
  selector: 'getting-here',
  imports: [
    ButtonModule
  ],
  templateUrl: './getting-here.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './getting-here.scss'
})
export class GettingHere {

  protected readonly content = GETTING_HERE_CONTENT;
}
