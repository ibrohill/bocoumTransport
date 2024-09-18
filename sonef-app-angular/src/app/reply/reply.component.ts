import { Component } from '@angular/core';
import { ReplyService } from '../services/reply.service'; // Import du service ReplyService
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  reply = { email: '', message: '' };

  constructor(private replyService: ReplyService) {} // Injection du service

  sendReply() {
    console.log('Envoi de la réponse avec les données :', this.reply);

    this.replyService.sendReply(this.reply)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'envoi de la réponse :', error);
          alert('Une erreur est survenue lors de l\'envoi de votre réponse.');
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Réponse reçue du serveur :', response);
        alert('Votre réponse a été envoyée!');
        this.reply = { email: '', message: '' }; // Réinitialisation du formulaire
      });
  }
}
