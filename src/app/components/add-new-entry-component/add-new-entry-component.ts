import { Component } from '@angular/core';
import { AddNewPetFormComponent } from "../add-new-pet-form-component/add-new-pet-form-component";

@Component({
  selector: 'app-add-new-entry-component',
  imports: [ AddNewPetFormComponent],
  templateUrl: './add-new-entry-component.html',
  styleUrl: './add-new-entry-component.css',
})
export class AddNewEntryComponent {
  AddNewPet() {
    console.log('Add new pet button clicked!');
  }
}
