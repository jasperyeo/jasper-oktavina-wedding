import { Injectable, signal, WritableSignal } from '@angular/core';
import { Country, DEFAULT_COUNTRY } from './app.constants';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public readonly country: WritableSignal<Country> = signal<Country>(DEFAULT_COUNTRY);
  public invitationOpened: WritableSignal<boolean> = signal<boolean>(false);
}