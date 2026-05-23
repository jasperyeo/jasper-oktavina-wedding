import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnA } from './qna';

describe('QnA', () => {
  let component: QnA;
  let fixture: ComponentFixture<QnA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QnA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
