import { Routes } from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {VehicleEffects} from './vehicles/state/vehicle-feature.effects';
import {vehicleReducer} from './vehicles/state/vehicle-feature.reducer';
import {VEHICLE_FEATURE_KEY} from './vehicles/state/vehicle-feature.state';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicle',
    pathMatch: 'full'
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicles/vehicles.routes').then(m => m.VEHICLE_FEATURE_ROUTES),
    providers: [
      provideState(VEHICLE_FEATURE_KEY, vehicleReducer),
      provideEffects([VehicleEffects]),
    ],
  },
  {
    path: '**',
    redirectTo: 'vehicles'
  }
];
