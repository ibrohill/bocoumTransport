import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';
import { ReservationService } from '../services/reservation.service';
import { BusService } from '../services/bus.service'; // Importez le service BusService

import { Notyf } from 'notyf';
import { voyageur } from "../models/voyageur.model";
import { Reservation } from "../models/reservation.model";
import { Bus } from '../models/bus.model'; // Importez le modèle Bus

@Component({
  selector: 'app-admin-voyages',
  templateUrl: './admin-voyages.component.html',
  styleUrls: ['./admin-voyages.component.css']
})
export class AdminVoyagesComponent implements OnInit {
  voyages: any[] = [];
  voyageurs: any[] = [];
  reservations: any[] = [];
  buses: Bus[] = []; // Stocker les bus
  totalVoyageurs = 0;
  totalReservations = 0;
  coutTotal = 0;
  voyagesAnnules = 0;
  voyagesActifs = 0;
  busTotal = 0;
  busActifs = 0;
  busInactifs = 0;
  errorMessage: string | null = null;
  private notyf: Notyf;

  constructor(
    private voyageService: VoyagesService,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private busService: BusService
  ) {
    this.notyf = new Notyf();
  }

  ngOnInit() {
    this.getVoyages();
    this.getVoyageurs();
    this.getReservations();
    this.getBuses();

  }

  getVoyages() {
    this.voyageService.getVoyages().subscribe(data => {
      this.voyages = data;
      this.calculateStatistics();
    });
  }

  getVoyageurs() {
    this.voyageService.getVoyageurs().subscribe(data => {
      this.voyageurs = data;
    });
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data.map(reservation => {
          const voyageur = this.voyageurs.find(v => v.id === reservation.voyageur_id);
          return {
            ...reservation,
            voyageur: voyageur || { nom: 'N/A' }
          };
        });
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des réservations.';
        console.error(error);
      }
    );
  }

  getBuses() {
    this.busService.getBuses().subscribe(data => {
      console.log('Données des bus:', data); // Vérifiez la structure des données ici
      this.buses = data;
      this.calculateBusStatistics();
    }, error => {
      console.error('Erreur lors de la récupération des bus', error);
    });
  }


  calculateStatistics() {
    this.totalVoyageurs = 0;
    this.totalReservations = this.voyages.length;
    this.coutTotal = 0;
    this.voyagesAnnules = 0;
    this.voyagesActifs = 0;

    this.voyages.forEach(voyage => {
      this.coutTotal += voyage.prix;
      if (voyage.status === 'Annulé') {
        this.voyagesAnnules++;
      } else {
        this.voyagesActifs++;
        this.totalVoyageurs += voyage.nombreVoyageurs || 0;
      }
    });
  }

  calculateBusStatistics() {
    if (!this.buses || this.buses.length === 0) {
      this.busTotal = 0;
      this.busActifs = 0;
      this.busInactifs = 0;
      return;
    }

    this.busTotal = this.buses.length;

    // Filter buses based on their status
    this.busActifs = this.buses.filter(bus => bus.status === 'actif').length;
    this.busInactifs = this.buses.filter(bus => bus.status === 'inactif').length;
  }



  editVoyage(id: number) {
    this.router.navigate(['/edit-voyage', id]);
  }

  deleteVoyage(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      this.voyageService.deleteVoyage(id).subscribe(() => {
        this.voyages = this.voyages.filter(v => v.id !== id);
        this.notyf.success('Voyage supprimé avec succès');
        this.calculateStatistics(); // Recalculer les statistiques après suppression
      });
    }
  }

  cancelVoyage(id: number) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce voyage ?')) {
      this.voyageService.cancelVoyage(id).subscribe(() => {
        const voyage = this.voyages.find(v => v.id === id);
        if (voyage) {
          voyage.status = 'Annulé';
          this.notyf.success('Voyage annulé avec succès');
          this.calculateStatistics(); // Recalculer les statistiques après annulation
        }
      }, error => {
        this.notyf.error('Erreur lors de l\'annulation du voyage');
      });
    }
  }
}
