import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: string[] = [];  // Tableau pour stocker les messages reçus

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // Écouter les messages diffusés via Laravel Echo
    window.Echo.channel('chat-channel')
      .listen('MessageSent', (e: any) => {
        this.messages.push(e.message);
      });
  }

  sendMessage() {
    if (this.message.trim() === '') return; // Ne pas envoyer de message vide

    // Envoyer le message via le service
    this.chatService.sendMessage(this.message).subscribe(response => {
      console.log('Message envoyé:', response.message);
      this.message = '';  // Réinitialiser le champ du message
    });
  }
}
