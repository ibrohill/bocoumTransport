import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arret } from '../models/arret';

@Injectable({
  providedIn: 'root'
})
export class ArretService {
  private apiUrl = 'http://localhost:8000/api/arrets';

  constructor(private http: HttpClient) {}

  getAllArrets(): Observable<Arret[]> {
    return this.http.get<Arret[]>(this.apiUrl);
  }

  createArret(arret: Partial<Arret>): Observable<Arret> {
    return this.http.post<Arret>(this.apiUrl, arret);
  }

  deleteArret(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



updateArret(id: number, arret: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, arret);
  }


}
