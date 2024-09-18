import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8000/api/send-message';  // URL de l'API Laravel

  constructor(private http: HttpClient) { }

  // Envoyer un message au serveur
  sendMessage(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { message });
  }
}
