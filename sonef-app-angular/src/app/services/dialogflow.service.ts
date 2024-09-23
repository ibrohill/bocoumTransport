import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private baseUrl = 'https://e610-154-125-226-241.ngrok-free.app/api/dialogflow-webhook'; // Remplace par l'URL de ton webhook

  constructor(private http: HttpClient) { }

  sendMessage(intent: string): Observable<any> {
    const body = {
      queryResult: {
        intent: {
          displayName: intent
        }
      }
    };
    return this.http.post<any>(this.baseUrl, body);
  }

}
