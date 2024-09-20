<?php

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationCancelled extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['database']; // Utilisez 'database' pour les notifications internes
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Votre réservation a été annulée.',
            // Ajoutez d'autres informations si nécessaire
        ];
    }
}
