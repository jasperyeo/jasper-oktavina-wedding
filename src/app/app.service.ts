import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public country: WritableSignal<string> = signal<string>('');
  public invitationOpened: WritableSignal<boolean> = signal<boolean>(false);
}