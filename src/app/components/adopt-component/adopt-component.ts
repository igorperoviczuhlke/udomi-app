import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdoptionWizardComponent } from "../adoption-wizard.component/adoption-wizard.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreService } from '../../services/store.service';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'app-adopt-component',
  imports: [AdoptionWizardComponent, MatProgressSpinnerModule, MobxAngularModule],
  templateUrl: './adopt-component.html',
  styleUrl: './adopt-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdoptComponent {
  constructor( protected store: StoreService ) {
  }
}
