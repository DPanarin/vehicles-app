import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule, MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {Vehicle} from '../models/vehicle.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-item',
  imports: [
    MatTooltip, MatIconModule, MatMiniFabButton, MatButtonModule, RouterLink
  ],
  standalone: true,
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss'
})
export class ListItem<T extends Vehicle> {
  @Input() item?: T;

  @Output() deleteItem: EventEmitter<T> = new EventEmitter<T>();
  @Output() editItem: EventEmitter<T> = new EventEmitter<T>();
}
