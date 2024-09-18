import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';
import { ReservationService } from '../services/reservation.service';
import { HttpClient } from '@angular/common/http';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  voyageId: number = 0;
  voyage: any;
  arrets: any[] = [];
  embarquements: any[] = [];
  nombrePersonnes: number = 1;
  prixTotal: number = 0;
  chaisesSelectionnees: number[] = [];
  paymentMethod: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  voyageurId: number = 0;

  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: {
      x: 'right',
      y: 'center',
    },
  });

  constructor(
    private route: ActivatedRoute,
    private voyagesService: VoyagesService,
    private router: Router,
    private http: HttpClient,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyageId = params['id'];
      this.nombrePersonnes = params['nombrePersonnes'];
      this.nom = params['nom'];
      this.prenom = params['prenom'];
      this.email = params['email'];
      this.telephone = params['telephone'];
      this.voyageurId = params['voyageur_id'];
      const chaisesSelectionneesParam = params['chaisesSelectionnees'];

      if (chaisesSelectionneesParam) {
        this.chaisesSelectionnees = chaisesSelectionneesParam.split(',').map(Number);
      } else {
        this.chaisesSelectionnees = [];
      }
    });

    this.voyagesService.getVoyageById(this.voyageId).subscribe({
      next: (data) => {
        this.voyage = data;
        this.prixTotal = this.voyage.prix * this.nombrePersonnes;

        // Récupérer les arrêts et embarquements
        this.voyagesService.getArretsByVoyageId(this.voyageId).subscribe({
          next: (data) => {
            this.arrets = data;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des arrêts:', err);
          }
        });

        this.voyagesService.getEmbarquementsByVoyageId(this.voyageId).subscribe({
          next: (data) => {
            this.embarquements = data;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des embarquements:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du voyage:', err);
        alert('Erreur lors de la récupération des détails du voyage.');
      }
    });
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  processPayment() {
    if (!this.voyage) {
      console.error("Les informations du voyage n'ont pas été chargées.");
      return;
    }

    const chaisesSelectionnees = this.chaisesSelectionnees.map(chaises => Number(chaises));

    const reservationData = {
      voyageur_id: this.voyageurId,
      dateReservation: new Date().toISOString().split('T')[0],
      statut: 'confirmée',
      montantTotal: this.prixTotal,
      depart: this.voyage.depart,
      arrivee: this.voyage.arrivee,
      heure: this.voyage.heure,
      nombrePersonnes: this.nombrePersonnes,
      prix: this.voyage.prix,
      bus_id: this.voyage.bus_id,
      chaisesSelectionnees: chaisesSelectionnees
    };

    this.reservationService.createReservation(reservationData)
      .subscribe({
        next: (response) => {
          console.log('Réservation créée avec succès', response);
          this.notyf.success('Réservation effectuée avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la création de la réservation', error);
          this.notyf.error('Erreur lors de la création de la réservation.');
        }
      });
  }
}
