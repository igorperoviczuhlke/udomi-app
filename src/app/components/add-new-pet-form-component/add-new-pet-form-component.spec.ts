import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPetFormComponent } from './add-new-pet-form-component';

describe('AddNewPetFormComponent', () => {
  let component: AddNewPetFormComponent;
  let fixture: ComponentFixture<AddNewPetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPetFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
