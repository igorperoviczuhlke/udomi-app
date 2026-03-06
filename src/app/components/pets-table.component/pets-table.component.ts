import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PetModel } from '../../models/pet.model';
import { AllCommunityModule, CellValueChangedEvent, ColDef, GridOptions, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { PetService } from '../../services/pet-service.service';
import { AddNewEntryComponent } from "../add-new-entry-component/add-new-entry-component";
import { AdoptComponent } from "../adopt-component/adopt-component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { StoreService } from '../../services/store.service';
import { MobxAngularModule } from 'mobx-angular';
import { computed, toJS } from 'mobx';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-pets-table.component',
  standalone: true,
  imports: [
    AgGridAngular, 
    AddNewEntryComponent, 
    AdoptComponent, 
    MatProgressSpinner, 
    MobxAngularModule
  ],
  templateUrl: './pets-table.component.html',
  styleUrl: './pets-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsTableComponent {
  //selectedPet = signal<PetModel | null>(null);
  //rowData = signal<PetModel[]>([]);
  // @computed get gridData() {
  //   return toJS(this.store.pets);
  // }
  
  isLoading = signal<boolean>(false);

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false, filter: true },
    { field: 'breed', headerName: 'Breed', width: 200, editable: false, filter: true },
    { field: 'age', headerName: 'Age', width: 100, editable: true, cellDataType: 'number'},
    { field: 'size', headerName: 'Size (cm)', width: 120, editable: true, cellDataType: 'number'},
    { field: 'adopting', headerName: 'Adopting', width: 120, editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['true', 'false'] } },
  ];
  
  defaultColDef: ColDef = {
    resizable: true,
    flex: 1, // Make columns take up available space
    minWidth: 140, // Set a minimum width for columns
  };

  gridOptions: GridOptions = {
    suppressScrollOnNewData: true, // Prevent grid from scrolling to top when new data is set
  };

  constructor(
    private petService: PetService, 
    public store: StoreService) {
    this.isLoading = this.petService.isLoading;
  }

  onGridReady(params: GridReadyEvent) {
    // Grid is ready
  }

  onCellValueChanged = (event: CellValueChangedEvent) => {
    if(event.colDef.field === 'adopting') {
      const petId = event.data.id;
      if(petId){
        if(event.value) {
        this.petService.selectPet(petId);
        //this.selectedPet.set(this.petService.selectedPetSignal());
        this.store.selectPet(petId);
        }
        else {
          this.petService.deselectAllPets();
          this.store.deselectAllPets();
        }
      }
    }
    else {
      if(event.value === null || event.value === undefined || event.value === '') {
        // Revert to old value if new value is invalid
        event.node.setDataValue(event.colDef.field!, event.oldValue);
        return;
      }
      const updatedPet: PetModel = {
        id: event.data.id,
        name: event.data.name,
        breed: event.data.breed,
        age: event.data.age,
        size: event.data.size,
        adopting: event.data.adopting
      };
      this.petService.updatePet(updatedPet);
      this.store.updatePet(updatedPet);
    }
  }
}
