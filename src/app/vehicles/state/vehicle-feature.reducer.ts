import {initialVehicleState} from './vehicle-feature.state';
import {VehicleActions} from './vehicle-feature.actions';
import {createReducer, on} from '@ngrx/store';

export const vehicleReducer = createReducer(
  initialVehicleState,

  on(VehicleActions.loadVehicles, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(VehicleActions.loadVehiclesSuccess, (state, { vehicles }) => ({
    ...state,
    list: vehicles,
    isLoading: false,
    error: null,
  })),

  on(VehicleActions.loadVehiclesFailure, (state, { error }) => ({
    ...state,
    list: [],
    isLoading: false,
    error,
  })),

  on(VehicleActions.loadVehicleDetails, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    selectedVehicle: null,
  })),

  on(VehicleActions.loadVehicleDetailsSuccess, (state, { vehicle }) => ({
    ...state,
    selectedVehicle: vehicle,
    isLoading: false,
    error: null,
  })),

  on(VehicleActions.loadVehicleDetailsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    selectedVehicle: null,
  })),

  on(VehicleActions.clearSelectedVehicle, (state) => ({
    ...state,
    selectedVehicle: null,
  })),
  on(VehicleActions.clearVehicleList, () => ({
    ...initialVehicleState
  }))
);
