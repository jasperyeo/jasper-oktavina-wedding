import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { createEvent, type EventAttributes } from 'ics';
import { AppService } from '../../app.service';
import { COUNTDOWN_CONTENT } from './countdown.constants';

@Component({
  standalone: true,
  selector: 'countdown',
  imports: [ Button ],
  templateUrl: './countdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './countdown.scss'
})
export class Countdown implements AfterViewInit {

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private countdownInterval: ReturnType<typeof setInterval> | undefined;
  protected readonly appService: AppService = inject(AppService);
  protected readonly content = computed(() => COUNTDOWN_CONTENT[this.appService.country()]);
  private readonly _weddingDate: Signal<Date> = computed(() => new Date(this.content().COUNTDOWN_DATETIME));
  private readonly _weddingDatetime: Signal<number> = computed(() => this._weddingDate().getTime());
  protected readonly days: WritableSignal<number> = signal<number>(0);
  protected readonly hours: WritableSignal<number> = signal<number>(0);
  protected readonly minutes: WritableSignal<number> = signal<number>(0);
  protected readonly seconds: WritableSignal<number> = signal<number>(0);
  protected readonly downloadError: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly event: Signal<EventAttributes> = computed(() => {
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
    this._weddingDate();
    this._weddingDatetime();
    this._updateCountdown();
    this.countdownInterval = setInterval(() => this._updateCountdown(), 1000);
    this._destroyRef.onDestroy(() => {
      if (this.countdownInterval !== undefined) {
        clearInterval(this.countdownInterval);
      }
    });
    this.event();
  }

  private _updateCountdown(): void {
    const diff: number = this._weddingDatetime() - new Date().getTime();
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

  protected async downloadCal(): Promise<void> {
    let url: string | undefined;
    let anchor: HTMLAnchorElement | undefined;
    this.downloadError.set(null);
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
      anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
    } catch (error) {
      console.error('Unable to download the calendar event.', error);
      this.downloadError.set(this.content().CALENDAR_DOWNLOAD_FAILED);
    } finally {
      if (anchor?.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }
}
