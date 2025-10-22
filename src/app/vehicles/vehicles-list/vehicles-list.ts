import {Component, inject, OnInit} from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-vehicles-list',
  imports: [],
  standalone: true,
  templateUrl: './vehicles-list.html',
  styleUrl: './vehicles-list.scss'
})
export class VehiclesList implements OnInit{
  private vehiclesService = inject(VehicleService);

  ngOnInit() {
    this.vehiclesService.getList().pipe(take(1)).subscribe(vehicles => console.log(vehicles));
  }
}
