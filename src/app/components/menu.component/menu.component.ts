import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private router: Router){
  }
  
  goHome() {
    this.router.navigate(['/PetsTableComponent']);   
  }

  goToSeeAdoptions(){
    this.router.navigate(['/AdoptionHistoryComponent']);     
  }
}
