import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { AppService } from '../../app.service';
import { GETTING_HERE_CONTENT } from './getting-here.constants';

@Component({
  selector: 'getting-here',
  imports: [
    TagModule,
    TableModule
  ],
  templateUrl: './getting-here.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './getting-here.scss'
})
export class GettingHere {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => GETTING_HERE_CONTENT);
}
