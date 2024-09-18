import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  private apiUrl = 'http://localhost:8000/api/reply'; // URL de l'API Laravel pour envoyer des réponses

  constructor(private http: HttpClient) {}

  sendReply(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data); // Envoi des données au backend
  }
}
