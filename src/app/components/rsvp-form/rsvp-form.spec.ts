import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpForm } from './rsvp-form';

describe('RsvpForm', () => {
  let component: RsvpForm;
  let fixture: ComponentFixture<RsvpForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsvpForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
