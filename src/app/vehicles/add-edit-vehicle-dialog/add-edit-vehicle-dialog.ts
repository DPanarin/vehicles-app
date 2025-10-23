import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {Vehicle} from '../models/vehicle.interface';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {VehicleActions} from '../state/vehicle-feature.actions';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {take} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';

export interface AddEditVehicleDialogData {
  vehicle: Vehicle;
}

@Component({
  selector: 'app-add-edit-vehicle-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogTitle,
    MatIconButton,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  standalone: true,
  templateUrl: './add-edit-vehicle-dialog.html',
  styleUrl: './add-edit-vehicle-dialog.scss'
})
export class AddEditVehicleDialog implements OnInit {
  private actions$ = inject(Actions);
  private store = inject(Store);

  readonly data: AddEditVehicleDialogData = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  isEditMode: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    manufacturer: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    fuel: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    vin: new FormControl('', Validators.required),
    color: new FormControl(''),
    mileage: new FormControl(),
  })

  ngOnInit(): void {
    this.isEditMode = !!this.data.vehicle;
    if (this.isEditMode) {
      this.isEditMode && this.form.patchValue({...this.data.vehicle})
    }
  }

  submitForm() {
    this.isEditMode ? this.dialogRef.close() : this.store.dispatch(VehicleActions.addVehicle({ vehicle: {
        ...this.form.value
      } as Vehicle}))

    this.actions$
      .pipe(ofType(VehicleActions.addVehicleSuccess), take(1))
      .subscribe(() => this.dialogRef.close(true));
  }

}
