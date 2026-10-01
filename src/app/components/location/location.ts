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

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => LOCATION_CONTENT[this.appService.country()]);
}
