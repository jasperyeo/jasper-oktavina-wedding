import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'rsvp-form',
  imports: [
    ButtonModule
  ],
  templateUrl: './rsvp-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './rsvp-form.scss'
})
export class RsvpForm {

}
