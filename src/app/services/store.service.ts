import { Injectable } from '@angular/core';
import { observable, autorun, computed, action, makeObservable, toJS } from 'mobx';
import { PetModel } from '../models/pet.model';
import { AdopterModel } from '../models/adopter.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  @observable pets: PetModel[] = [];
  @observable selectedPet: PetModel | null = null;
  @observable adoptionHistory: PetModel[] = [];
  @observable adopter: AdopterModel | null = null;

  constructor() {
    makeObservable(this);
  }

  //TODO check effect

  @computed get getGridData() {
    //return this.pets;
    return toJS(this.pets);
  }

  @action addPet(pet: PetModel) {
    this.pets.push(pet);
  }

  @action addPets(pets: PetModel[]) {
    this.pets.push(...pets);
  }

  @action clearPets() {
    this.pets = [];
  }

  @action selectPet(petId: number) {
    this.deselectAllPets();
    const pet = this.pets.find(p => p.id === petId);
    if (pet) {
      pet.adopting = true;
      this.selectedPet = pet;
    }
  }

  @action deselectAllPets() {
    this.pets.forEach(pet => pet.adopting = false);
    this.selectedPet = null;
  }

  @action updatePet(updatedPet: PetModel) {
    const index = this.pets.findIndex(p => p.id === updatedPet.id);
    if (index !== -1) {
      this.pets[index] = updatedPet;
    }
  }

  @action setAdopter(adopter: AdopterModel) {
    this.adopter = adopter;
  }

  @action addToAdoptionHistory(pet: PetModel) {
    this.adoptionHistory.push(pet);
  }
}
  