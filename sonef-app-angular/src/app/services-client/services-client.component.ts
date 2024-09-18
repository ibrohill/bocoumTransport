import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: any;
    Pusher: any;
  }
}

@Component({
  selector: 'app-services-client',
  templateUrl: './services-client.component.html',
  styleUrls: ['./services-client.component.css']
})
export class ServicesClientComponent implements OnInit {

  messages: string[] = [];
  newMessage: string = '';

  constructor() {}

  ngOnInit() {
    this.initializeChat();
  }

  initializeChat() {
    // Configurer Pusher
    window.Pusher = Pusher;

    // Configurer Laravel Echo pour écouter le canal
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '4b1275599caf2eadfa64', // Votre clé Pusher
      cluster: 'mt1', // Votre cluster Pusher
      forceTLS: true,
    });

    // Écouter les messages diffusés sur le canal "chat-channel"
    window.Echo.channel('chat-channel')
      .listen('MessageSent', (event: any) => {
        console.log('Message reçu :', event.message);
        this.messages.push(event.message);
      });
  }

  // Envoyer un message (ici, vous pouvez connecter à l'API Laravel pour envoyer le message)
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Ajoutez le message localement pour l'afficher avant la réponse du serveur
      this.messages.push(this.newMessage);

      // Envoyer le message via une API (vous devez implémenter cette logique)
      // Exemple : this.chatService.sendMessage(this.newMessage).subscribe();

      this.newMessage = ''; // Réinitialiser le champ de message
    }
  }
}
