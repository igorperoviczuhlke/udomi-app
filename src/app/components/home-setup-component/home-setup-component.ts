import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../services/pet-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HomeSetupModel } from '../../models/home-setup.model';

@Component({
  selector: 'app-home-setup-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home-setup-component.html',
  styleUrl: './home-setup-component.css',
})

export class HomeSetupComponent implements OnInit {
  @Output() dialogClosed = new EventEmitter<string>();
  homeSetupForm!: FormGroup;
  formChangesSubscription: Subscription | undefined;
  public isValidSignal = signal(false);

  constructor(
    private formBuilder: FormBuilder, 
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {
      // Initialize the form group here
      this.homeSetupForm = this.formBuilder.group({
        hasGarden: [false],
        hasOtherPets: [false],
        hasKids: [false],
        otherPetsCount: [undefined],
      });

      this.formChangesSubscription = this.homeSetupForm.valueChanges.subscribe(value => {
        const wasValid = this.isValidSignal();
        const isAtLeastOneSelected = value.hasGarden || (value.hasOtherPets && value.otherPetsCount > 0) || value.hasKids;
        if(isAtLeastOneSelected !== wasValid) {
          this.isValidSignal.set(isAtLeastOneSelected);
          console.log('Form valid:', isAtLeastOneSelected);
        }
      });
  }

  closeDialog() {
     this.dialogClosed.emit('Dialog closed');
   }

  onSubmit() {
    if (this.homeSetupForm.valid && this.petService.selectedPetSignal()) {
      const homeSetupData: HomeSetupModel = {
        ...this.homeSetupForm.value,
      };
      this.petService.homeSetupSignal.set(homeSetupData);
      //this.petService.deleletePet(this.petService.selectedPetSignal()!.id); 
      this.closeDialog();
      this.router.navigate(['/AdoptionsTableComponent']);      
     } else {
     }
  }
}
