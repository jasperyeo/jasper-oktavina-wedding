import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HASHTAG } from '../../app.constants';
import { QNA_CONTENT } from './qna.constants';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'qna',
  imports: [
    Toast
  ],
  providers: [ MessageService ],
  templateUrl: './qna.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './qna.scss'
})
export class QnA {

  private readonly _messageService = inject(MessageService);
  protected readonly content = QNA_CONTENT;
  protected readonly hashtag = HASHTAG;

  protected splitAnswer(answer: string): Array<string> {
    const token = HASHTAG;
    return answer.split(token).flatMap((part, index, array) =>
      index < array.length - 1 ? [part, token] : [part]
    );
  }

  protected async copyHashtag(): Promise<void> {
    try {
      await navigator.clipboard.writeText(HASHTAG);
      this._messageService.add({ severity: 'success', summary: this.content.COPIED });
    } catch {
      this._messageService.add({ severity: 'error', summary: this.content.COPY_FAILED });
    }
  }
}
