import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model'; // Assurez-vous que le modèle est correctement importé

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000/api/reservations';

  constructor(private http: HttpClient) {}


  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservationData);
  }
  // Méthode pour créer une réservation

  // Méthode pour récupérer toutes les réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }
  // getChaisesDisponibles(voyageId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/chaises/${voyageId}`);
  // }
  // getChaisesDisponibles(voyageId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:8000/api/voyages/${voyageId}/chaises`);
  // }

  getChaisesDisponibles(voyageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/voyages/${voyageId}/chaises`);
  }



  getReservation(id: number) {
    return this.http.get(`${this.apiUrl}/reservations/${id}`);
  }



  makeReservation(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getReservationsByVoyageurId(voyageurId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?voyageurId=${voyageurId}`);
  }
  getReservedChaises(voyageId: number) {
    return this.http.get<{ id: number }[]>(`${this.apiUrl}/reservations/${voyageId}/chaises`);
  }




  // Méthode pour récupérer une réservation par ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer les réservations d'un voyageur spécifique
  getReservationByVoyageurId(voyageurId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?voyageur_id=${voyageurId}`);
  }


  // Méthode pour mettre à jour une réservation
  updateReservation(id: number, reservationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reservationData);
  }

  // Méthode pour supprimer une réservation
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
  }
}


