import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalLogoIntro } from './cultural-logo-intro';

describe('CulturalLogo', () => {
  let component: CulturalLogoIntro;
  let fixture: ComponentFixture<CulturalLogoIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CulturalLogoIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalLogoIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
