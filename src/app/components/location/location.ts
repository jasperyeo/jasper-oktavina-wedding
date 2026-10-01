import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../app.service';
import { LOCATION_CONTENT } from './location.constants';

@Component({
  standalone: true,
  selector: 'location',
  imports: [],
  templateUrl: './location.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './location.scss'
})
export class Location {

  protected readonly appService: AppService = inject(AppService);
  protected readonly content = computed(() => LOCATION_CONTENT[this.appService.country()]);
}
