import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {selectIsLoading, selectListState, selectVehicleList} from '../state/vehicle-feature.selectors';
import {VehicleActions} from '../state/vehicle-feature.actions';
import {Vehicle} from '../models/vehicle.interface';
import {ListItem} from '../list-item/list-item';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {VehicleListStateInterface} from '../models/vehicle-list-state.interface';
import {combineLatest, debounceTime, map, Observable, Subject, take} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {filterById, sortById} from '../helpers/helper-functions';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatDialog,
} from '@angular/material/dialog';
import {AddEditVehicleDialog} from '../add-edit-vehicle-dialog/add-edit-vehicle-dialog';
import {ActionConfirmationDialog} from '../action-confirmation-dialog/action-confirmation-dialog';

@Component({
  selector: 'app-vehicles-list',
  imports: [ListItem, MatIconModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './vehicles-list.html',
  styleUrl: './vehicles-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiclesList implements OnInit{
  private store = inject(Store);
  readonly dialog = inject(MatDialog);
  private destroy$ = inject(DestroyRef);

  selectOptions = [
    {
      label: 'Vehicle name',
      value: 'name'
    },
    {
      label: 'Manufacturer',
      value: 'manufacturer'
    },
    {
      label: 'Model',
      value: 'model'
    }
  ];

  sortOrders = ['asc', 'desc'];

  form = new FormGroup({
    sortOrder: new FormControl('asc'),
    sortBy: new FormControl('vehicleName'),
    searchString: new FormControl(''),
    filterBy: new FormControl('vehicleName'),
  })

  listState: Observable<VehicleListStateInterface> = this.store.select(selectListState);
  rawVehiclesList: Observable<Vehicle[]> = this.store.select(selectVehicleList);

  list$ = combineLatest([
    this.rawVehiclesList,
    this.listState
  ]).pipe(
    map(([rawVehiclesList, listState]) => {
      if (!rawVehiclesList?.length) {
        return [];
      }

      let resultedList: Vehicle[] = [...rawVehiclesList];

      if (!!listState.searchString) {
        resultedList = filterById<Vehicle>(rawVehiclesList, listState);
      }

      resultedList = sortById<Vehicle>(resultedList, listState);

      return resultedList;
    })
  );

  vehicles = toSignal(this.list$, { initialValue: [] });
  isLoading = toSignal(this.store.select(selectIsLoading), { initialValue: false });

  ngOnInit() {
    this.store.dispatch(VehicleActions.loadVehicles());
    this.listState.pipe(take(1)).subscribe((state: VehicleListStateInterface) => {
      this.form.patchValue(state, { emitEvent: false });
    })
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroy$), debounceTime(500))
      .subscribe((formValue) => {
        this.store.dispatch(VehicleActions.updateVehicleListState({ listState: formValue as VehicleListStateInterface }));
    })
  }

  openAddEditDialog(vehicle?: Vehicle) {
    const dialogData = !!vehicle ? { vehicle } : {};
    this.dialog.open(AddEditVehicleDialog, { data: dialogData });
  }

  onDeleteItem(vehicle: Vehicle) {
    this.dialog.open(ActionConfirmationDialog, {
      data: {
        confirmationText: 'Are you sure you want to delete this vehicle?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        dialogHeaderText: 'Action confirmation',
        shouldShowCancelButton: true
      }
    });
  }
}
