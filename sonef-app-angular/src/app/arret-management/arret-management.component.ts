import { Component, OnInit } from '@angular/core';
import { ArretService } from '../services/arret.service';
import { VoyagesService } from '../services/voyages.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-arret-management',
  templateUrl: './arret-management.component.html',
  styleUrls: ['./arret-management.component.css']
})
export class ArretManagementComponent implements OnInit {

  arrets: any[] = [];
  newArret: any = {};
  voyages: any[] = [];
  public isLoggedIn = false;
  public userRole: string | null = null;

  constructor(private arretService: ArretService,
              private voyageService: VoyagesService,
              public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadArrets();
    this.loadVoyages();
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.authService.getUser().subscribe(user => {
          this.userRole = user.role;
          this.authService.setUserRole(user.role);
        });
      }
    });
  }

  getUserRole(): string | null {
    return this.userRole;
  }


  loadArrets(): void {
    this.arretService.getAllArrets().subscribe(data => {
      this.arrets = data;
    });
  }

  loadVoyages(): void {
    this.voyageService.getVoyages().subscribe(data => {
      this.voyages = data; // Initialisez la propriété voyages
    });
  }

// Exemple d'utilisation après l'ajout d'un arrêt :
  addArret(): void {
    this.arretService.createArret(this.newArret).subscribe(
      () => {
        this.loadArrets();
        this.newArret = {};
        Swal.fire('Succès', 'Arrêt ajouté avec succès!', 'success');
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible d\'ajouter l\'arrêt!', 'error');
      }
    );
  }



  deleteArret(id: number): void {
    this.arretService.deleteArret(id).subscribe(() => {
      this.loadArrets();
    });
  }

  // arret-management.component.ts
  editArret(arret: any): void {
    this.newArret = { ...arret };  // Pré-remplir le formulaire avec les infos existantes
  }

  updateArret(): void {
    this.arretService.updateArret(this.newArret.id, this.newArret).subscribe(() => {
      this.loadArrets();  // Recharger la liste
      this.newArret = {};  // Réinitialiser le formulaire
    });
  }

}
