import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { createEvent, type EventAttributes } from 'ics';
import { AppService } from '../../app.service';
import { COUNTDOWN_CONTENT } from './countdown.constants';

@Component({
  standalone: true,
  selector: 'countdown',
  imports: [ Button, Toast ],
  providers: [MessageService],
  templateUrl: './countdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './countdown.scss'
})
export class Countdown implements AfterViewInit {

  private readonly messageService: MessageService = inject(MessageService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private countdownInterval: ReturnType<typeof setInterval> | undefined;
  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => COUNTDOWN_CONTENT[this.appService.country()]);
  public readonly year: WritableSignal<number> = signal<number>(new Date().getFullYear()) ;
  public readonly weddingDate: Signal<Date> = computed(() => new Date(this.content().COUNTDOWN_DATETIME));
  public readonly weddingDatetime: Signal<number> = computed(() => this.weddingDate().getTime());
  public readonly days: WritableSignal<number> = signal<number>(0);
  public readonly hours: WritableSignal<number> = signal<number>(0);
  public readonly minutes: WritableSignal<number> = signal<number>(0);
  public readonly seconds: WritableSignal<number> = signal<number>(0);
  public readonly event: Signal<EventAttributes> = computed(() => {
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
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
    this.destroyRef.onDestroy(() => {
      if (this.countdownInterval !== undefined) {
        clearInterval(this.countdownInterval);
      }
    });
    this.event();
  }

  private updateCountdown(): void {
    const diff: number = this.weddingDatetime() - new Date().getTime();
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
  }

  public async downloadCal(): Promise<void> {
    let url: string | undefined;
    try {
      const filename: string = this.content().CALENDAR_TITLE + '.ics';
      const file: Blob = await new Promise((resolve, reject) => {
        createEvent(this.event(), (error, value) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(new File([value], filename, {
            type: 'text/calendar'
          }));
        });
      });
      url = URL.createObjectURL(file);
      const anchor: HTMLAnchorElement = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('Unable to download the calendar event.', error);
      this.messageService.add({ severity: 'error', summary: this.content().CALENDAR_DOWNLOAD_FAILED });
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }
}
