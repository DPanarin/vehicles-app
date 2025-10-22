import {Routes} from '@angular/router';
import {VehiclesList} from './vehicles-list/vehicles-list';
import {VehicleDetails} from './vehicle-details/vehicle-details';
import {provideState, feature} from '@ngrx/store';
import {VEHICLE_FEATURE_KEY, VehicleState} from './state/vehicle-feature.state';
import {vehicleReducer} from './state/vehicle-feature.reducer';
import {provideEffects} from '@ngrx/effects';
import {VehicleEffects} from './state/vehicle-feature.effects';

const VEHICLE_FEATURE_SLICE = feature({
  name: VEHICLE_FEATURE_KEY, // Use 'name' instead of 'key' here
  reducer: vehicleReducer,
});

export const VEHICLE_FEATURE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: VehiclesList,
    providers: [
      provideState<VehicleState>({
        key: VEHICLE_FEATURE_KEY,
        reducer: vehicleReducer,
      }),
      provideEffects([VehicleEffects]),
    ]
  },
  {
    path: ':id',
    component: VehicleDetails
  }
];
