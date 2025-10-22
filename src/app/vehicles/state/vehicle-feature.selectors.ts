import {VEHICLE_FEATURE_KEY, VehicleState} from './vehicle-feature.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectVehicleState = createFeatureSelector<VehicleState>(
  VEHICLE_FEATURE_KEY
);

export const selectVehicleList = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.list
);

export const selectError = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.error
);

export const selectListState = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.listState
);

export const selectSelectedVehicle = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.selectedVehicle
);

export const selectIsLoading = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.isLoading
);
