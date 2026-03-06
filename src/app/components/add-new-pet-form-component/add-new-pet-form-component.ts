import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet-service.service';
import { MatLabel, MatFormField, MatInput } from "@angular/material/input";
import { ReusableDialogComponent } from "../reusable-dialog-component/reusable-dialog-component";

@Component({
  selector: 'app-add-new-pet-form-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatLabel, MatFormField, MatInput, ReusableDialogComponent],
  templateUrl: './add-new-pet-form-component.html',
  styleUrl: './add-new-pet-form-component.css',
})
export class AddNewPetFormComponent implements OnInit {
  @Output() dialogClosed = new EventEmitter<string>();
  @ViewChild(ReusableDialogComponent) confirmDialog!: ReusableDialogComponent;

  newPetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private petService: PetService) {}

   ngOnInit() {
     // Initialize the form group here
     this.newPetForm = this.formBuilder.group({
       name: ['', Validators.required],
       breed: ['', Validators.required],
       age: [undefined, [Validators.required, Validators.min(0)]],
       size: [undefined, [Validators.required, Validators.min(0)]],
       adopting: [false]
     });
   }

   onSubmit() {
     if (this.newPetForm.valid) {
       const newPet: PetModel = {
          id: Date.now(), // Generate a unique ID based on timestamp
          name: this.newPetForm.value.name,
          breed: this.newPetForm.value.breed,
          age: this.newPetForm.value.age,
          size: this.newPetForm.value.size,
          adopting: false
       }
       this.closeDialog();
       this.petService.setIsLoading(true);

       setTimeout(()=>{

       this.petService.addPet(newPet);
       this.petService.setIsLoading(false);

       this.confirmDialog.title = 'Well...'
      this.confirmDialog.message = `You gave away ${newPet.name}. If at any moment you grow your soul back, he or she might be here `;
      this.confirmDialog.openDialog();
     }, 1000);

     } else {
       console.log('Form is invalid');
     }
   }

   closeDialog() {
     this.dialogClosed.emit('Dialog closed');
   }
}
