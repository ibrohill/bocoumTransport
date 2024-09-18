import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from '../models/bus.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:8000/api/buses';

  constructor(private http: HttpClient) { }

  // getBuses() {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  addBus(bus: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bus);
  }
  getBusById(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }
  // getBusById(id: number) {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // addBus(bus: any) {
  //   return this.http.post(this.apiUrl, bus);
  // }

  activateBus(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/activate`, {});
  }

  deactivateBus(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/deactivate`, {});
  }


  deleteBus(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
