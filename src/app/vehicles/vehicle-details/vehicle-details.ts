import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {VehicleActions} from '../state/vehicle-feature.actions';
import {toSignal} from '@angular/core/rxjs-interop';
import {selectIsLoading, selectSelectedVehicle} from '../state/vehicle-feature.selectors';
import {ListItem} from '../list-item/list-item';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicle-details',
  imports: [
    MatButton,
    MatIcon,
    RouterLink,
    ListItem,
    MatProgressSpinner
  ],
  standalone: true,
  templateUrl: './vehicle-details.html',
  styleUrl: './vehicle-details.scss'
})
export class VehicleDetails implements OnInit, OnDestroy {
  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);

  vehicleDetails = toSignal(this.store.select(selectSelectedVehicle));
  isLoading = toSignal(this.store.select(selectIsLoading), { initialValue: false });

  ngOnInit() {
    const vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.store.dispatch(VehicleActions.loadVehicleDetails({ id: vehicleId }));
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(VehicleActions.clearSelectedVehicle());
  }
}
