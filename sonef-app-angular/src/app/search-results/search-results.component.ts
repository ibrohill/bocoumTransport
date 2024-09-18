import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';
import { Voyage } from '../models/voyage.model';
import { Router } from '@angular/router';
import { Notyf } from 'notyf'; // Importation de Notyf

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  voyages: Voyage[] = [];
  nombreDePersonnes: number = 1; // Valeur par défaut
  private notyf = new Notyf({
    duration: 3000, // Durée d'affichage de la notification
    ripple: true,   // Effet ripple
    position: {
      x: 'right',
      y: 'top',
    },
  });


  constructor(
    private route: ActivatedRoute,
    private voyagesService: VoyagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyagesService.rechercherVoyages({
        depart: params['depart'],
        arrivee: params['arrivee'],
        date: params['date'],
        nombre_de_personnes: params['nombre_de_personnes']
      }).subscribe({
        next: (result) => {
          this.voyages = result;
          if (this.voyages.length === 0) {
            this.notyf.success('Aucun voyage ne correspond aux critères de recherche.');
          }
        },
        error: (err) => {
          this.notyf.error('Erreur lors de la recherche de voyages.');
        }
      });
    });
  }

  reserver(voyageId: number) {
    this.router.navigate(['/reservation', voyageId]);
  }

  // reserver(voyage: Voyage, nombreDePersonnes: number): void {
  //   if (nombreDePersonnes > voyage.places_disponibles) {
  //     this.notyf.error('Nombre de personnes excède les places disponibles.');
  //     return;
  //   }
  //
  //   this.voyagesService.reserverVoyage(voyage.id, nombreDePersonnes).subscribe({
  //     next: () => {
  //       this.notyf.success('Réservation effectuée avec succès.');
  //       voyage.places_disponibles -= nombreDePersonnes;
  //     },
  //     error: (err) => {
  //       this.notyf.error('Erreur lors de la réservation.');
  //     }
  //   });
  // }
}
