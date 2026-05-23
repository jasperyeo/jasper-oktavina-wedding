import { Component, computed, inject } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { AppService } from '../../app.service';
import { GETTING_HERE_CONTENT } from './qna.constants';

@Component({
  selector: 'qna',
  imports: [
    TagModule,
    TableModule
  ],
  templateUrl: './qna.html',
  styleUrl: './qna.scss'
})
export class QnA {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => GETTING_HERE_CONTENT);
}
