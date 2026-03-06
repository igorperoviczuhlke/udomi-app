import { Routes } from '@angular/router';
import { PetsTableComponent } from './components/pets-table.component/pets-table.component';
import { AdoptionHistoryComponent } from './components/adoption-history.component/adoption-history.component';

export const routes: Routes = [
    {
        path: 'AdoptionHistoryComponent',
        //loadComponent: () => import('./components/adoptions-table.component/adoptions-table.component').then(m => m.AdoptionsTableComponent),
        component: AdoptionHistoryComponent,
        title: 'Adoptions History',
    },
    {
        path: 'PetsTableComponent',
        //loadComponent: () => import('./components/pets-table.component/pets-table.component').then(m => m.PetsTableComponent),
        component: PetsTableComponent,
        title: 'Pets Table'
    },
    {
        path: '**',
        redirectTo: 'PetsTableComponent',
        pathMatch: 'full'
    }
];
