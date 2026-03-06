import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PetService } from './services/pet-service.service';
import { MenuComponent } from "./components/menu.component/menu.component";
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('udomi-app');

  canAdopt = computed(() => 
    this.store.selectedPet && this.petService.homeSetupSignal()
  );

  constructor(private petService: PetService, private store: StoreService)
  {
    
  }
}
