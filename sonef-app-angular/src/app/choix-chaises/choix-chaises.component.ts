import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';
import { VoyageurService } from '../services/voyageur.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-choix-chaises',
  templateUrl: './choix-chaises.component.html',
  styleUrls: ['./choix-chaises.component.css']
})
export class ChoixChaisesComponent implements OnInit {
  errorMessage: string | null = null;
  voyageId: number = 0;
  nombrePersonnes: number = 1;
  depart: string = '';
  arrivee: string = '';
  heure: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  formSaisi: boolean = false;
  voyageurId: number | null = null;
  chaises: any[] = [];

  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voyageurService: VoyageurService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyageId = params['id'];
      this.nombrePersonnes = params['nombrePersonnes'];
      this.depart = params['depart'];
      this.arrivee = params['arrivee'];
      this.heure = params['heure'];
      this.voyageurId = params['voyageur_id'];

      console.log('Voyage ID:', this.voyageId);
      console.log('Nombre de personnes:', this.nombrePersonnes);

      this.reservationService.getChaisesDisponibles(this.voyageId).subscribe(
        chaises => {
          console.log('Chaises récupérées:', chaises);
          this.chaises = chaises.map(chaise => ({
            ...chaise,
            selected: false,
            disponible: chaise.disponible
          }));
          console.log('Chaises après transformation:', this.chaises);
        },
        error => {
          console.error('Erreur lors de la récupération des chaises:', error);
        }
      );
    });
  }


  selectChaise(chaise: any) {
    if (chaise.disponible) {
      if (chaise.selected) {
        chaise.selected = false;
      } else if (this.getSelectedChairs().length < this.nombrePersonnes) {
        chaise.selected = true;
      } else {
        this.notyf.error(`Vous ne pouvez sélectionner que ${this.nombrePersonnes} chaise(s).`);
      }
    }
  }


  onSubmit() {
    if (this.nom && this.prenom && this.email && this.telephone) {
      const voyageurData = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone
      };

      this.voyageurService.addVoyageur(voyageurData).subscribe(
        response => {
          this.voyageurId = response.id; // Récupère l'ID du voyageur
          this.notyf.success('Informations du voyageur enregistrées avec succès.');
          this.formSaisi = true;
        },
        error => {
          this.notyf.error('Erreur lors de l\'enregistrement des informations du voyageur.');
          console.error('Erreur:', error);
        }
      );
    } else {
      this.notyf.error('Veuillez remplir toutes les informations.');
    }
  }

  initiatePayment() {
    console.log('Nombre de personnes:', this.nombrePersonnes);
    const selectedChairs = this.getSelectedChairs();
    console.log('Chaises sélectionnées:', selectedChairs);

    if (this.nom && this.prenom && this.email && this.telephone) {
        this.router.navigate(['/paiement'], {
          queryParams: {
            id: this.voyageId,
            nombrePersonnes: this.nombrePersonnes,
            chaisesSelectionnees: selectedChairs.map(chaise => chaise.id).join(','),
            voyageur_id: this.voyageurId,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            telephone: this.telephone,
            depart: this.depart,
            arrivee: this.arrivee,
            heure: this.heure
          }
        });

    } else {
      this.errorMessage = 'Veuillez remplir toutes les informations.';
    }
  }



  getChaisesRows(): any[][] {
    const rows = [];
    const chairsPerRow = 4; // Nombre de chaises par groupe
    const totalChaises = 56; // Nombre total de chaises

    for (let i = 0; i < totalChaises; i += chairsPerRow) {
      const row = this.chaises.slice(i, i + chairsPerRow);
      rows.push(row);
    }

    return rows;
  }




  getSelectedChairs() {
    const selectedChairs = this.chaises.filter(chaise => chaise.selected);
    console.log('Chaises sélectionnées:', selectedChairs); // Débogage
    return selectedChairs;
  }


}
