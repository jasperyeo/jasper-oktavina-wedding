import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'rsvp-form',
  imports: [
    ButtonModule
  ],
  templateUrl: './rsvp-form.html',
  styleUrl: './rsvp-form.scss'
})
export class RsvpForm {

}
