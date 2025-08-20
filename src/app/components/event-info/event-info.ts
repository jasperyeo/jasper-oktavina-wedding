import { Component, computed, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { EVENT_INFO_CONTENT } from './event-info.constants';

@Component({
  standalone: true,
  selector: 'event-info',
  imports: [],
  templateUrl: './event-info.html',
  styleUrl: './event-info.scss'
})
export class EventInfo {

  public readonly appService = inject(AppService);
  public readonly content = computed(() => EVENT_INFO_CONTENT[this.appService.country()]);
}
