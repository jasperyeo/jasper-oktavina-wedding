import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsInfo } from './parents-info';

describe('ParentsInfo', () => {
  let component: ParentsInfo;
  let fixture: ComponentFixture<ParentsInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentsInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
