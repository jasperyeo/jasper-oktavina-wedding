import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RSVP_FORM_CONTENT } from './rsvp-form.constants';

@Component({
  standalone: true,
  selector: 'rsvp-form',
  imports: [
    ButtonModule
  ],
  templateUrl: './rsvp-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './rsvp-form.scss'
})
export class RsvpForm {

  protected readonly content = RSVP_FORM_CONTENT;
}
