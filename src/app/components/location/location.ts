import { AfterViewInit, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { AppService } from '../../app.service';
import { LOCATION_CONTENT } from './location.constants';

@Component({
  standalone: true,
  selector: 'location',
  imports: [],
  templateUrl: './location.html',
  styleUrl: './location.scss'
})
export class Location implements AfterViewInit {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => LOCATION_CONTENT[this.appService.country()]);
  public enableEmbed: WritableSignal<boolean> = signal<boolean>(false);

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.enableEmbed.set(true);
    }, 1000);
  }
}
