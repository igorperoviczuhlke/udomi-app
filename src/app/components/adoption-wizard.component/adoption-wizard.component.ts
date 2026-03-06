import {Component, EventEmitter, inject, Output, signal, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { AdopterModel, Housing, LivingType } from '../../models/adopter.model';
import { PetModel } from '../../models/pet.model';
import { HomeSetupModel } from '../../models/home-setup.model';
import { PetService } from '../../services/pet-service.service';
import { ReusableDialogComponent } from "../reusable-dialog-component/reusable-dialog-component";
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-adoption-wizard',
  templateUrl: './adoption-wizard.component.html',
  styleUrl: './adoption-wizard.component.css',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReusableDialogComponent
],
})
export class AdoptionWizardComponent {
  @Output() dialogClosed = new EventEmitter<string>();
  @ViewChild(ReusableDialogComponent) confirmDialog!: ReusableDialogComponent;
  selectedPet = signal<PetModel | null>(null);
  homeSituation = signal<HomeSetupModel | null>(null);
  hasOtherPets = signal<boolean>(false);
  otherPetsCount = signal<number>(0)  ;
  housings: Housing[] = [
    {value: 'house', viewValue: 'House'},
    {value: 'apartment', viewValue: 'Apartment'},
  ];
  isEditable = true;

  constructor(
    private petService: PetService,
    private store: StoreService) { 
    this.selectedPet = this.petService.selectedPetSignal;
    this.homeSituation = this.petService.homeSetupSignal;
  }

  private _formBuilder = inject(FormBuilder);
  adopterFormGroup = this._formBuilder.group({
    adopterName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    livingType: [undefined],
  });
  homeSetupFormGroup = this._formBuilder.group({
    hasGarden: [],
    hasKids: [],
    hasOtherPets: [],
    otherPetsCount: []
  });
  doneFormGroup = this._formBuilder.group({});

  onSubmit() {
    this.petService.setIsLoading(true);

    if (this.adopterFormGroup.valid) {
    const adopter: AdopterModel = {
      id: Date.now(),
      name: this.adopterFormGroup.value.adopterName || '',
      email: this.adopterFormGroup.value.email || '',
      phoneNumber: this.adopterFormGroup.value.phoneNumber || '',
      livingType: this.adopterFormGroup.value.livingType || LivingType.House
    }

    this.closeWizardDialog();

    setTimeout(()=>{
      this.store.setAdopter(adopter);
      this.store.addToAdoptionHistory(this.selectedPet()!);
      this.store.deselectAllPets();
      
      this.petService.deleletePet(this.selectedPet()!.id)
      this.petService.setIsLoading(false);

      this.confirmDialog.title = 'Congatulations ' + adopter.name + '!!!'
      this.confirmDialog.message = 'You have adopted ' + this.selectedPet()!.name;
      this.confirmDialog.openDialog();
       
      this.petService.deselectAllPets();

      if(this.petService.serverErrors().length > 0) {
       alert(this.petService.serverErrors().join('\n'));
       this.petService.serverErrors.set([]); // Clear errors after displaying
      }
      else {  
      
      }
    }, 1000);

    // this.petService.addOwner(adopter);
    // this.petService.deleletePet(this.selectedPet()!.id)
    // this.petService.addPetToAdoptHistory(this.selectedPet()!);

    // this.dial.title = 'Congatulations!!!'
    // this.dial.message = 'You have adopted ' + this.selectedPet()!.name;
    // this.dial.openDialog();

    // if(this.petService.serverErrors().length > 0) {
    //   alert(this.petService.serverErrors().join('\n'));
    //   this.petService.serverErrors.set([]); // Clear errors after displaying
    // }
    // else {  
    //   this.closeDialog();

    //   //this.comfirmationDialog.nativeElement.showModal();
    // }


    }
  }
  
  closeWizardDialog() {
    this.dialogClosed.emit('Dialog closed');
  }

  setOtherPetsCount($event: any){
    this.otherPetsCount.set($event.target.value);
  }
}