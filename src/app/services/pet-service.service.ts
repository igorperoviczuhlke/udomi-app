import { Injectable, OnInit, signal } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { HomeSetupModel } from '../models/home-setup.model';
import { AdopterModel } from '../models/adopter.model';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class PetService implements OnInit {
  public petsSignal = signal<PetModel[]>([]);
  public selectedPetSignal = signal<PetModel | null>(null);
  public homeSetupSignal = signal<HomeSetupModel | null>(null);
  public serverErrors = signal<string[]>([]);
  public adoptionHistorySignal = signal<PetModel[]>([]);
  public isLoading = signal<boolean>(false);

  constructor(private apiService: ApiServiceService) {
    this.fetchPets();
    this.petsSignal = this.apiService.petsSignal;
    this.serverErrors = this.apiService.serverErrors;
  }

  ngOnInit() {
    this.fetchPets();
  }

  selectPet(petId: number) {
    this.deselectAllPets();
    const pets = [...this.petsSignal()];
    const pet = pets.find(p => p.id === petId);
    if (pet) {
      pet.adopting = true;
      this.selectedPetSignal.set(pet);
    }
    this.petsSignal.set(pets);
  }

  deselectAllPets() {
    //const pets = [...this.petsSignal()];
    const pets = this.petsSignal();
    pets.forEach(pet => pet.adopting = false);
    this.selectedPetSignal.set(null);
    this.petsSignal.set(pets);
  }

  fetchPets() {
    this.apiService.fetchPets();
  }

  addPet(newPet: PetModel) {
    this.apiService.addPet(newPet);
  }

  deleletePet(petId: number) {
    this.apiService.deleletePet(petId);
  }

  updatePet(updatedPet: PetModel) {
    this.apiService.updatePet(updatedPet);
  }

  setIsLoading(newState: boolean){
    const newIsLoading = newState;
    this.isLoading.set(newState);
  }
}