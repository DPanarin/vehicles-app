import {Component, inject, OnInit} from '@angular/core';
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
  confirmButtonText: string;
  cancelButtonText: string;
  shouldShowCancelButton: boolean;
  dialogHeaderText: string;
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
export class ActionConfirmationDialog implements OnInit {
  readonly data: ActionConfirmationDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  confirmButtonText = 'Ok';
  cancelButtonText = 'Cancel';
  dialogHeaderText: string = 'Alert';
  shouldShowCancelButton = false;


  ngOnInit() {
    this.confirmButtonText = this.data.confirmButtonText || this.confirmButtonText;
    this.cancelButtonText = this.data.cancelButtonText || this.cancelButtonText;
    this.shouldShowCancelButton =  this.data.shouldShowCancelButton;
    this.dialogHeaderText = this.data.dialogHeaderText || this.dialogHeaderText;
  }
}
