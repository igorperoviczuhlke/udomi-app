import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseUrl = 'http://localhost:3000';
  public petsSignal = signal<PetModel[]>([]);
  public serverErrors = signal<string[]>([]);

  constructor(private http: HttpClient, private storeService: StoreService) {}
  

   fetchPets() {
      this.http.get<PetModel[]>(`${this.baseUrl}/pets`).subscribe(pets => {
        this.petsSignal.set(pets);
        this.storeService.addPets(pets);
      });
    }

  addPet(newPet: PetModel) {
    this.http.post<PetModel>(`${this.baseUrl}/pets`, newPet).subscribe({
      next: (addedPet) => {
        const pets = [...this.petsSignal(), addedPet];
        this.petsSignal.set(pets);
        this.storeService.addPet(addedPet);
        console.log('in store: ', this.storeService.pets);
      },
      error: (error)=> {
        console.error('Error adding pet:', error);
        this.serverErrors.set(['Failed to add pet. Please try again later.']);
      }
    });
  }

  deleletePet(petId: number) {
    this.http.delete(`${this.baseUrl}/pets/${petId}`).subscribe({
      next: () =>
      {
        const pets = this.petsSignal().filter(p => p.id !== petId);
        this.petsSignal.set(pets);
        this.storeService.clearPets();
        this.storeService.addPets(pets);
      }, 
      error: (error)=> {
       console.error('Error deleting pet:', error);
       this.serverErrors.set(['Failed to delete pet. Please try again later.']);
      }
    });
  }

    updatePet(updatedPet: PetModel) {
     this.http.put<PetModel>(`${this.baseUrl}/pets/${updatedPet.id}`, updatedPet).subscribe({
      next: () => {
        const pets = this.petsSignal().map(p => p.id === updatedPet.id ? updatedPet : p);
        this.petsSignal.set(pets);
      }, 
      error: (error) => {
        console.error('Error updating pet:', error);
        this.serverErrors.set(['Failed to update pet. Please try again later.']);
     },
    });
  }
}
