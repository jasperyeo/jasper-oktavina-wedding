import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
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
export class Countdown {

  public readonly appService: AppService = inject(AppService);
  public readonly content = computed(() => COUNTDOWN_CONTENT[this.appService.country()]);
  public readonly year: WritableSignal<number> = signal<number>(new Date().getFullYear()) ;
  public readonly weddingDate: WritableSignal<Date> = signal<Date>(new Date('Sep 27, 2025 12:00:00'));
  public readonly weddingDatetime: WritableSignal<number> = signal<number>(this.weddingDate().getTime());
  public readonly days: WritableSignal<number> = signal<number>(0);
  public readonly hours: WritableSignal<number> = signal<number>(0);
  public readonly minutes: WritableSignal<number> = signal<number>(0);
  public readonly seconds: WritableSignal<number> = signal<number>(0);
  public countdownTimer = setInterval(() => {
    const today: number = new Date().getTime();
    const diff: number = this.weddingDatetime() - today;
    this.days.set(Math.floor(diff / (1000 * 60 * 60 * 24)));
    this.hours.set(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutes.set(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds.set(Math.floor((diff % (1000 * 60)) / 1000));
  }, 1000);
  public readonly event: any = {
    start: [2025, 9, 27, 12, 0],
    duration: { hours: 5, minutes: 0 },
    title: 'Pernikahan Jasper & Oktavina',
    description: 'Pernikahan Jasper & Oktavina',
    location: 'Sam\'s Anna Seafood',
    geo: { lat: 0.905931459883334, lon: 104.44512154232793 }, // 0.905931459883334, 104.44512154232793
    busyStatus: 'BUSY',
    organizer: { name: 'Oktavina', email: 'oktavina.personal@gmail.com' }
  };

  public async downloadCal(): Promise<void> {
    // this.icsGenerator.downloadIcs(
    //   this.weddingDate(),
    //   new Date(this.weddingDate().getTime() + (60 * 60 * 1000 * 5)),
    //   'Pernikahan Jasper & Oktavina',
    //   '',
    //   '',
    //   'Sam\'s Anna Seafood'
    // );

    const filename = 'Pernikahan Jasper & Oktavina.ics';
    const file: Blob = await new Promise((resolve, reject) => {
      createEvent(this.event, (error, value) => {
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
