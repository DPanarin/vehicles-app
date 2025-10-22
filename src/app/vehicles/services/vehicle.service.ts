import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicle} from '../models/vehicle.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly apiBaseUrl = 'https://67d4273b8bca322cc26c5b38.mockapi.io';
  private http = inject(HttpClient);

  getList(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiBaseUrl}/vehicles`);
  }

  getVehicleDetails(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiBaseUrl}/vehicles/${id}`);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiBaseUrl}/vehicles`, vehicle);
  }
}
