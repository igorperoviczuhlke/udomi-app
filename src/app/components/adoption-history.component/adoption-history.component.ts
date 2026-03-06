import { Component, inject, signal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AdopterModel } from '../../models/adopter.model';

@Component({
  selector: 'app-adoption-history.component',
  standalone: true,
  templateUrl: './adoption-history.component.html',
  styleUrl: './adoption-history.component.css',
})
export class AdoptionHistoryComponent {
  protected store: StoreService = inject(StoreService);

  //test = signal<AdopterModel | null>(this.store.adopter);
}
