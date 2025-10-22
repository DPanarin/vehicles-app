import {Vehicle} from '../models/vehicle.interface';
import {VehicleListStateInterface} from '../models/vehicle-list-state.interface';

export const VEHICLE_FEATURE_KEY = 'vehicles';

export interface VehicleState {
  key: string;
  list: Vehicle[];
  selectedVehicle: Vehicle | null;
  listState: VehicleListStateInterface;
  isLoading: boolean;
  error: string | null;
}

export const initialVehicleState: VehicleState = {
  key: VEHICLE_FEATURE_KEY,
  list: [],
  listState: {
    sortOrder: 'asc'
  },
  selectedVehicle: null,
  isLoading: false,
  error: null,
};
