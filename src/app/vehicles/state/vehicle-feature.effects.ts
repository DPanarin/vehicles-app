import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {VehicleActions} from './vehicle-feature.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';

import {VehicleService} from '../services/vehicle.service';
import {filterByUniqueId} from '../helpers/helper-functions';
import {Vehicle} from '../models/vehicle.interface';

@Injectable()
export class VehicleEffects {
  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);

  loadVehicles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      switchMap(() =>
        this.vehicleService.getList().pipe(
          map((vehicles) => VehicleActions.loadVehiclesSuccess({ vehicles: filterByUniqueId<Vehicle>(vehicles, 'id') })),
          // map((vehicles) => VehicleActions.loadVehiclesSuccess({ vehicles: [] })),
          catchError((error) => of(VehicleActions.loadVehiclesFailure({ error: error.message })))
        )
      )
    );
  });

  loadVehicleDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VehicleActions.loadVehicleDetails),
      switchMap(({ id }) =>
        this.vehicleService.getVehicleDetails(id).pipe(
          map((vehicle) => VehicleActions.loadVehicleDetailsSuccess({ vehicle })),
          catchError((error) => of(VehicleActions.loadVehicleDetailsFailure({ error: error.message })))
        )
      )
    );
  });

  addVehicle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VehicleActions.addVehicle),
      switchMap(({ vehicle }) => {
        return this.vehicleService.addVehicle(vehicle).pipe(
            map((vehicle) => VehicleActions.addVehicleSuccess({vehicle})),
            catchError((error) => of(VehicleActions.addVehicleFailure({error: error.message})))
          );
        }
      )
    )
  });
}
