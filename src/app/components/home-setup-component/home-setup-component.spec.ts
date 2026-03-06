import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSetupComponent } from './home-setup-component';

describe('HomeSetupComponent', () => {
  let component: HomeSetupComponent;
  let fixture: ComponentFixture<HomeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSetupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
