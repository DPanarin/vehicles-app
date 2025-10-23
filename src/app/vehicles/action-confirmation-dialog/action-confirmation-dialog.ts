import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput, MatLabel} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

export interface ActionConfirmationDialogData {
  confirmationText: string;
}

@Component({
  selector: 'app-action-confirmation-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  standalone: true,
  templateUrl: './action-confirmation-dialog.html',
  styleUrl: './action-confirmation-dialog.scss'
})
export class ActionConfirmationDialog {
  readonly data: ActionConfirmationDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);


}
