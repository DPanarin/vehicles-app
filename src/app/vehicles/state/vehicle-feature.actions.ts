import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Vehicle} from '../models/vehicle.interface';

export const VehicleActions = createActionGroup({
  source: 'Vehicle',
  events: {
    'Load Vehicles': emptyProps(),
    'Load Vehicles Success': props<{ vehicles: Vehicle[] }>(),
    'Load Vehicles Failure': props<{ error: string }>(),
    'Load Vehicle Details': props<{ id: string }>(),
    'Load Vehicle Details Success': props<{ vehicle: Vehicle }>(),
    'Load Vehicle Details Failure': props<{ error: string }>(),
    'Add Vehicle': props<{ vehicle: Vehicle }>(),
    'Add Vehicle Success': props<{ vehicle: Vehicle }>(),
    'Add Vehicle Failure': props<{ error: string }>(),
    'Clear Vehicle List': emptyProps(),
    'Clear Selected Vehicle': emptyProps(),
  },
});
