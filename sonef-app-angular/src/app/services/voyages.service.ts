import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Voyage } from '../models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class VoyagesService {
  private apiUrl = 'http://localhost:8000/api/voyages';
  private baseUrl = 'http://localhost:8000/api/rechercher';

  constructor(private http: HttpClient) {}

  rechercherVoyages(params: { depart: string; arrivee: string; date: string; nombre_de_personnes: number }): Observable<Voyage[]> {
    let httpParams = new HttpParams()
      .set('depart', params.depart || '')
      .set('arrivee', params.arrivee || '')
      .set('date', params.date || '')
      .set('nombre_de_personnes', params.nombre_de_personnes ? params.nombre_de_personnes.toString() : '0');

    return this.http.get<Voyage[]>(this.baseUrl, { params: httpParams });
  }



  getVoyages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`);
  }


  createReservation(reservationData: any) {
    return this.http.post('/api/reservations', reservationData, { withCredentials: true });
  }


  reserverVoyage(voyageId: number, nombre_de_personnes: number): Observable<void> {
    return this.http.post<void>(`http://localhost:8000/api/reserver`, {
      voyageId,
      nombre_de_personnes
    });
  }




  ajouterVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage).pipe(catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, paymentData, { withCredentials: true });
  }

  getVoyageurs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/voyageurs'); // Changez l'URL selon votre API
  }


  deleteVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cancelVoyage(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/cancel`, {}); // Assurez-vous que votre backend gère cette route
  }

  updateVoyage(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }


  updateVoyageStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/voyages/${id}/status`, { status });
  }

  getStatistics() {
    return this.http.get<any>('api/statistics'); // Remplacez par l'URL de votre API
  }

  getArretsByVoyageId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/arrets`);
  }

  getEmbarquementsByVoyageId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/embarquements`);
  }
}
