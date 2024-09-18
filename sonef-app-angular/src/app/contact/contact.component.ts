import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service'; // Import du service ContactService
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };

  constructor(private contactService: ContactService) {} // Injection du service

  sendEmail() {
    console.log('Envoi de l\'e-mail avec les données :', this.contact);

    this.contactService.sendEmail(this.contact)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
          alert('Une erreur est survenue lors de l\'envoi de votre message.');
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Réponse reçue du serveur :', response);
        alert('Votre message a été envoyé!');
        this.contact = { name: '', email: '', message: '' }; // Réinitialisation du formulaire
      });
  }
}
