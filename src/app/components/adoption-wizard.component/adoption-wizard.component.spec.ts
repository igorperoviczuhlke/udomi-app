import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionWizardComponent } from './adoption-wizard.component';

describe('AdoptionWizardComponent', () => {
  let component: AdoptionWizardComponent;
  let fixture: ComponentFixture<AdoptionWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionWizardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
