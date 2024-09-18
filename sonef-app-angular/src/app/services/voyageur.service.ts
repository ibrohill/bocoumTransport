import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { voyageur } from '../models/voyageur.model';

@Injectable({
  providedIn: 'root',
})
export class VoyageurService {
  private apiUrl = 'http://localhost:8000/api/voyageurs'; // Modifiez si nécessaire

  constructor(private http: HttpClient) {}

  // addVoyageur(voyageur: any) {
  //   return this.http.post(this.apiUrl, voyageur);
  // }
  // addVoyageur(voyageurData: any): Observable<voyageur> {
  //   return this.http.post<voyageur>(this.apiUrl, voyageurData);
  // }
  addVoyageur(voyageurData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, voyageurData);
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-data`); // Adapté selon votre API
  }

  getVoyageur(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  reserveChaises(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, data);
  }

  getReservedChairs(voyageId: number) {
    return this.http.get<number[]>(`/api/voyages/${voyageId}/reservations`);
  }

  getChaisesDisponibles(voyageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chaises-disponibles/${voyageId}`);
  }



}
