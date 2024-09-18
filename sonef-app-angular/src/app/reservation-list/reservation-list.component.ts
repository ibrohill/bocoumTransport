import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../services/reservation.service'; // Assure-toi que le chemin est correct

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  voyageurId: string | null = null;
  reservations: any[] = []; // Remplace `any` par le type approprié
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.voyageurId = this.route.snapshot.paramMap.get('voyageurId');
    this.getReservations();
  }

  getReservations(): void {
    if (this.voyageurId) {
      this.reservationService.getReservationsByVoyageurId(this.voyageurId)
        .subscribe(
          (data) => {
            this.reservations = data; // Assigne les réservations récupérées
          },
          (error) => {
            this.errorMessage = 'Erreur lors de la récupération des réservations.';
            console.error(error);
          }
        );
    }
  }
}
