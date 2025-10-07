import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingHere } from './getting-here';

describe('GettingHere', () => {
  let component: GettingHere;
  let fixture: ComponentFixture<GettingHere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GettingHere]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GettingHere);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
