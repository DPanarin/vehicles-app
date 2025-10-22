import {Vehicle} from '../models/vehicle.interface';
import {VehicleListStateInterface} from '../models/vehicle-list-state.interface';

export const VEHICLE_FEATURE_KEY = 'vehicles';

export interface VehicleState {
  list: Vehicle[];
  selectedVehicle: Vehicle | null;
  listState: VehicleListStateInterface;
  isLoading: boolean;
  error: string | null;
}

export const initialVehicleState: VehicleState = {
  list: [],
  listState: {
    sortOrder: 'asc'
  },
  selectedVehicle: null,
  isLoading: false,
  error: null,
};
