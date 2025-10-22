import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicle',
    pathMatch: 'full'
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicles/vehicles.routes').then(m => m.VEHICLE_FEATURE_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'vehicles'
  }
];
