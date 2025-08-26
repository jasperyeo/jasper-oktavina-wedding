import { Component, computed, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { LOCATION_CONTENT } from './location.constants';

@Component({
  standalone: true,
  selector: 'location',
  imports: [],
  templateUrl: './location.html',
  styleUrl: './location.scss'
})
export class Location {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => LOCATION_CONTENT[this.appService.country()]);
}
