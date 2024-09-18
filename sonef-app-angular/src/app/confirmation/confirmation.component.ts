import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { VoyagesService } from '../services/voyages.service';
import { Notyf } from 'notyf';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  voyageId: number = 0;
  voyage: any;
  nombrePersonnes: number = 1;
  prixTotal: number = 0;
  chaisesSelectionnees: number[] = [];
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private voyagesService: VoyagesService,
              private http: HttpClient,
              private reservationService: ReservationService,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyageId = params['id'];
      this.nombrePersonnes = params['nombrePersonnes'];
      this.nom = params['nom'];
      this.prenom = params['prenom'];
      this.email = params['email'];
      this.telephone = params['telephone'];
      const chaisesSelectionneesParam = params['chaisesSelectionnees'];

      if (chaisesSelectionneesParam) {
        this.chaisesSelectionnees = chaisesSelectionneesParam.split(',').map(Number);
      }
    });

    // Simuler une récupération des détails du voyage
    // this.voyageService.getVoyageById(this.voyageId).subscribe(data => { this.voyage = data; });
  }

  confirmerReservation() {
    this.router.navigate(['/recherche'], { queryParams: {
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
            chaisesSelectionnees: this.chaisesSelectionnees
      }});

    this.notyf.success('Réservation effectuée avec succès.');
  }

  // processPayment() {
  //   const reservationData = {
  //     voyageur_id: this.voyageurId,
  //     dateReservation: new Date().toISOString().split('T')[0],
  //     statut: 'confirmée',
  //     montantTotal: this.prixTotal,
  //     depart: this.voyage.depart,
  //     arrivee: this.voyage.arrivee,
  //     heure: this.voyage.heure,
  //     nombrePersonnes: this.nombrePersonnes,
  //     prix: this.voyage.prix,
  //     bus_id: this.voyage.bus_id,
  //     chaisesSelectionnees: this.chaisesSelectionnees
  //   };
  //
  //   this.reservationService.createReservation(reservationData)
  //     .subscribe({
  //       next: (response) => {
  //         this.notyf.success('Réservation effectuée avec succès.');
  //         this.router.navigate(['/confirmation'], { queryParams: { reservationId: response.id } });
  //       },
  //       error: () => {
  //         this.notyf.error('Erreur lors de la création de la réservation.');
  //       }
  //     });
  // }
  annulerReservation() {
    this.router.navigate(['/voyages']); // Redirection vers la liste des voyages ou autre page
  }

  modifierReservation() {
    this.router.navigate(['/modifier-reservation'], { queryParams: {
        id: this.voyageId,
        nombrePersonnes: this.nombrePersonnes,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        chaisesSelectionnees: this.chaisesSelectionnees.join(',')
      }});
  }
}
