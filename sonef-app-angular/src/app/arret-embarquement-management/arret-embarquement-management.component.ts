import { Component, OnInit } from '@angular/core';
import { ArretService } from '../services/arret.service';
import { VoyagesService } from '../services/voyages.service';
import { Arret } from '../models/arret';
import { Voyage } from '../models/voyage.model';

@Component({
  selector: 'app-arret-embarquement-management',
  templateUrl: './arret-embarquement-management.component.html',
  styleUrls: ['./arret-embarquement-management.component.css']
})
export class ArretEmbarquementManagementComponent implements OnInit {
  arrets: Arret[] = [];
  voyages: Voyage[] = [];
  newArret: Partial<Arret> = {};
  reservation: { nom: string; arret_id: number } = { nom: '', arret_id: 0 };
  isAdmin: boolean = false; // Vous pouvez ajuster cela en fonction de la logique d'authentification

  constructor(
    private arretService: ArretService,
    private voyageService: VoyagesService
  ) {}

  ngOnInit(): void {
    this.loadArrets();
    this.loadVoyages();
    this.checkAdminStatus();
  }

  loadArrets(): void {
    this.arretService.getAllArrets().subscribe(arrets => {
      this.arrets = arrets;
    });
  }

  loadVoyages(): void {
    this.voyageService.getVoyages().subscribe(voyages => {
      this.voyages = voyages;
    });
  }

  addArret(): void {
    if (this.newArret) {
      this.arretService.createArret(this.newArret).subscribe(() => {
        this.loadArrets();
      });
    }
  }

  editArret(arret: Arret): void {
    // Implémentez la logique pour modifier un arrêt
  }

  deleteArret(id: number): void {
    this.arretService.deleteArret(id).subscribe(() => {
      this.loadArrets();
    });
  }

  reserveEmbarquement(): void {
    // Implémentez la logique pour réserver un embarquement
  }

  checkAdminStatus(): void {
    // Logique pour vérifier si l'utilisateur est un admin
    // Exemple : this.isAdmin = this.authService.isAdmin();
  }
}
