import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../app.service';
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

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => GETTING_HERE_CONTENT);
}
