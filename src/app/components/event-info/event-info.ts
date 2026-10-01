import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppService } from '../../app.service';
import { HASHTAG } from '../../app.constants';
import { EVENT_INFO_CONTENT } from './event-info.constants';

@Component({
  standalone: true,
  selector: 'event-info',
  imports: [ Toast ],
  providers: [ MessageService ],
  templateUrl: './event-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './event-info.scss'
})
export class EventInfo {

  private readonly _messageService = inject(MessageService);
  private readonly _appService: AppService = inject(AppService);
  protected readonly content = computed(() => EVENT_INFO_CONTENT[this._appService.country()]);
  protected readonly hashtag = HASHTAG;

  protected async copyHashtag(): Promise<void> {
    try {
      await navigator.clipboard.writeText(HASHTAG);
      this._messageService.add({ severity: 'success', summary: this.content().COPIED });
    } catch {
      this._messageService.add({ severity: 'error', summary: this.content().COPY_FAILED });
    }
  }

}
