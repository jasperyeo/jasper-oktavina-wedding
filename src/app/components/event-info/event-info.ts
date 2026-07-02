import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppService } from '../../app.service';
import { HASHTAG } from '../../app.constants';
import { EVENT_INFO_CONTENT } from './event-info.constants';

@Component({
  standalone: true,
  selector: 'event-info',
  imports: [ Button, Toast ],
  providers: [ MessageService ],
  templateUrl: './event-info.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './event-info.scss'
})
export class EventInfo {

  private _messageService = inject(MessageService);
  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => EVENT_INFO_CONTENT[this.appService.country()]);
  public readonly hashtag = HASHTAG;

  public copyHashtag(): void {
    navigator.clipboard.writeText(HASHTAG);
    this._messageService.add({ severity: 'success', summary: this.content().COPIED });
  }

}
