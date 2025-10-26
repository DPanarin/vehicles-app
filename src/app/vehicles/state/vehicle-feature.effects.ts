import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MatDialog} from '@angular/material/dialog';
import {catchError, map, of, switchMap, tap, withLatestFrom} from 'rxjs';

import {VehicleActions} from './vehicle-feature.actions';

import {VehicleService} from '../services/vehicle.service';
import {filterByUniqueId} from '../helpers/helper-functions';
import {Vehicle} from '../models/vehicle.interface';
import {selectListState} from './vehicle-feature.selectors';
import {Store} from '@ngrx/store';
import {ActionConfirmationDialog} from '../action-confirmation-dialog/action-confirmation-dialog';

@Injectable()
export class VehicleEffects {
  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);
  private store = inject(Store);
  private dialog = inject(MatDialog);

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
      withLatestFrom(this.store.select(selectListState)),
      switchMap(([{ vehicle }, listState]) => {
        return this.vehicleService.addVehicle(vehicle).pipe(
            map((vehicle) => VehicleActions.addVehicleSuccess({vehicle})),
            tap(() => {
              if (!!listState.searchString) {
                this.dialog.open(ActionConfirmationDialog, {
                  data: {
                    confirmationText: 'Please note that due to the current filter settings, you might not see the newly added vehicle in the list. If this happens, clear the search field.',
                    confirmButtonText: 'Ok',
                  }
                });
              }
            }),
            catchError((error) => of(VehicleActions.addVehicleFailure({error: error.message})))
          );
        }
      )
    )
  });
}
