import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { AppService } from '../../app.service';
import { HASHTAG } from '../../app.constants';
import { GETTING_HERE_CONTENT } from './qna.constants';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';

@Component({
  selector: 'qna',
  imports: [
    TagModule,
    TableModule,
    Button,
    Toast
  ],
  providers: [ MessageService ],
  templateUrl: './qna.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './qna.scss'
})
export class QnA {

  private _messageService = inject(MessageService);
  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => GETTING_HERE_CONTENT);
  public readonly hashtag = HASHTAG;

  public splitAnswer(answer: string): Array<string> {
    const token = HASHTAG;
    return answer.split(token).flatMap((part, index, array) =>
      index < array.length - 1 ? [part, token] : [part]
    );
  }

  public copyHashtag(): void {
    navigator.clipboard.writeText(HASHTAG);
    this._messageService.add({ severity: 'success', summary: this.content().COPIED });
  }
}
