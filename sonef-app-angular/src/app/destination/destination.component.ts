import { Component, OnInit } from '@angular/core';
import { VoyagesService } from '../services/voyages.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Notyf } from 'notyf';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  voyages: any[] = []; // Tableau pour stocker les voyages
  filter: { depart: string, arrivee: string, date: string } = { depart: '', arrivee: '', date: '' }; // Filtre
  showAll: boolean = false; // État pour afficher tous les voyages ou seulement les trois premiers
  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: {
      x: 'right',
      y: 'center',
    },
  });

  constructor(
    private voyagesService: VoyagesService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchVoyages();
  }

  fetchVoyages(): void {
    this.voyagesService.getVoyages().subscribe({
      next: (data) => {
        // Regrouper les voyages par départ et arrivée
        const groupedVoyages = data.reduce((acc: any, voyage: any) => {
          const key = `${voyage.depart}-${voyage.arrivee}`;
          if (!acc[key]) {
            acc[key] = {
              depart: voyage.depart,
              arrivee: voyage.arrivee,
              dates: []
            };
          }
          acc[key].dates.push({
            date: voyage.date,
            heure: voyage.heure,
            id: voyage.id,
            prix: voyage.prix // Ajouter le prix ici
          });
          return acc;
        }, {});

        // Transformer l'objet en tableau de groupes pour faciliter l'affichage
        this.voyages = Object.values(groupedVoyages);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des voyages:', error);
      }
    });
  }

  // Méthode pour filtrer les voyages
  filteredVoyages() {
    return this.voyages.filter(group => {
      const matchesDepart = group.depart.toLowerCase().includes(this.filter.depart.toLowerCase());
      const matchesArrivee = group.arrivee.toLowerCase().includes(this.filter.arrivee.toLowerCase());
      const matchesDate = group.dates.some((date: { date: string; }) => date.date === this.filter.date);
      return matchesDepart && matchesArrivee && (this.filter.date ? matchesDate : true);
    });
  }

  // Méthode pour obtenir les voyages affichés
  displayedVoyages() {
    return this.showAll ? this.filteredVoyages() : this.filteredVoyages().slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  reserver(voyageId: number) {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/reservation', voyageId]);
      } else {
        this.notyf.error('Vous devez être connecté pour effectuer une réservation.');
        this.router.navigate(['/login']);
      }
    });
  }
}
