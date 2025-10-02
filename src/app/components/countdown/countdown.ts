import { AfterViewInit, Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { createEvent } from 'ics';
import { AppService } from '../../app.service';
import { COUNTDOWN_CONTENT } from './countdown.constants';

@Component({
  standalone: true,
  selector: 'countdown',
  imports: [
    ButtonModule
  ],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss'
})
export class Countdown implements AfterViewInit {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => COUNTDOWN_CONTENT[this.appService.country()]);
  public readonly year: WritableSignal<number> = signal<number>(new Date().getFullYear()) ;
  public readonly weddingDate: Signal<Date> = computed(() => new Date(this.content().COUNTDOWN_DATETIME));
  public readonly weddingDatetime: Signal<number> = computed(() => this.weddingDate().getTime());
  public readonly days: WritableSignal<number> = signal<number>(0);
  public readonly hours: WritableSignal<number> = signal<number>(0);
  public readonly minutes: WritableSignal<number> = signal<number>(0);
  public readonly seconds: WritableSignal<number> = signal<number>(0);
  public readonly countdownTimer = computed(() => {
    return setInterval(() => {
      const today: number = new Date().getTime();
      const diff: number = this.weddingDatetime() - today;
      if (diff > 0) {
        this.days.set(Math.floor(diff / (1000 * 60 * 60 * 24)));
        this.hours.set(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes.set(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds.set(Math.floor((diff % (1000 * 60)) / 1000));
      } else {
        this.days.set(0);
        this.hours.set(0);
        this.minutes.set(0);
        this.seconds.set(0);
      }
    }, 1000);
  });
  public readonly event: Signal<any> = computed(() => {
    return {
      start: this.content().CALENDAR_DATETIME,
      duration: this.content().CALENDAR_DURATION,
      title: this.content().CALENDAR_TITLE,
      description: this.content().CALENDAR_DESCRIPTION,
      location: this.content().CALENDAR_LOCATION,
      geo: this.content().CALENDAR_GEO,
      busyStatus: this.content().CALENDAR_STATUS,
      organizer: this.content().CALENDAR_ORGANIZER
    }
  });

  public ngAfterViewInit(): void {
    this.weddingDate();
    this.weddingDatetime();
    this.countdownTimer();
    this.event();
  }

  public async downloadCal(): Promise<void> {
    const filename: string = this.content().CALENDAR_TITLE + '.ics';
    const file: Blob = await new Promise((resolve, reject) => {
      createEvent(this.event(), (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(new File([value], filename, { type: 'text/calendar' }));
      });
    });
    const url: string = URL.createObjectURL(file);
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
