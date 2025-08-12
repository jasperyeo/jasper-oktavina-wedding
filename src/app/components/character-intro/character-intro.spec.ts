import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterIntro } from './character-intro';

describe('CharacterIntro', () => {
  let component: CharacterIntro;
  let fixture: ComponentFixture<CharacterIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
