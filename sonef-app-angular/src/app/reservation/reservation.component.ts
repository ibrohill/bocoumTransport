import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { VoyagesService } from '../services/voyages.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  voyageId: number = 0;
  voyage: any;
  nombrePersonnes: number = 1; // Valeur par défaut
  prixTotal: number = 0; // Montant total
  voyageurId: number = 1; // Remplacez par votre logique d'authentification



  constructor(private route: ActivatedRoute, private voyagesService: VoyagesService, private router: Router ) {}

  ngOnInit(): void {
    // Récupération de l'ID du voyage à partir des paramètres de la route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.voyageId = idParam ? +idParam : 0;

    console.log('Voyage ID récupéré:', this.voyageId);

    // Appel du service pour récupérer les détails du voyage
    this.voyagesService.getVoyageById(this.voyageId).subscribe({
      next: (data) => {
        console.log('Données du voyage récupérées:', data);
        this.voyage = data;
        this.updateMontantTotal();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du voyage:', err);
      }
    });
  }

  // Méthode pour mettre à jour le montant total
  updateMontantTotal(): void {
    if (this.voyage && this.voyage.prix) {
      this.prixTotal = this.voyage.prix * this.nombrePersonnes; // Calculer le montant total
    }
  }

  reserver(): void {
    if (this.nombrePersonnes > this.voyage.places_disponibles) {
      alert('Nombre de places non disponible.');
      return;
    }


    const reservationData = {
      voyageur_id: this.voyageurId,
      dateReservation: new Date(),
      statut: 'confirmée',
      montantTotal: this.prixTotal,
      nombrePersonnes: this.nombrePersonnes,
    };

    this.voyagesService.createReservation(reservationData).subscribe({
      next: () => {
        // Mettre à jour les places disponibles
        this.voyage.places_disponibles -= this.nombrePersonnes;
        alert('Réservation réussie!');
      },
      error: (error) => {
        console.error('Erreur lors de la réservation:', error);
      }
    });

    this.router.navigate(['/choix-chaises'], {
      queryParams: { id: this.voyageId, nombrePersonnes: this.nombrePersonnes }
    });
  }

  onNombrePersonnesChange(): void {
    this.updateMontantTotal(); // Met à jour le montant total lorsque le nombre de personnes change
  }
}
