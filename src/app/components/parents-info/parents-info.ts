import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PARENTS_INFO_CONTENT } from './parents-info.constants';

@Component({
  standalone: true,
  selector: 'parents-info',
  imports: [],
  templateUrl: './parents-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './parents-info.scss'
})
export class ParentsInfo {

  protected readonly content = PARENTS_INFO_CONTENT;
}