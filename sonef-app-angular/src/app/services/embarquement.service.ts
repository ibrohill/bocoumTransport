import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbarquementService {

  private baseUrl = 'http://localhost:8000/api/embarquements'; // Ajustez l'URL en fonction de votre configuration

  constructor(private http: HttpClient) { }

  getAllEmbarquements(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getEmbarquementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createEmbarquement(embarquement: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, embarquement);
  }

  updateEmbarquement(id: number, embarquement: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, embarquement);
  }

  deleteEmbarquement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
