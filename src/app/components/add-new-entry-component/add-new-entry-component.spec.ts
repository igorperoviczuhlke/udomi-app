import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEntryComponent } from './add-new-entry-component';

describe('AddNewEntryComponent', () => {
  let component: AddNewEntryComponent;
  let fixture: ComponentFixture<AddNewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewEntryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
