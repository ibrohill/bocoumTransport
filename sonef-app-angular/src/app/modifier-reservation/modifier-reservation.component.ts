import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';

@Component({
  selector: 'app-modifier-reservation',
  templateUrl: './modifier-reservation.component.html',
  styleUrls: ['./modifier-reservation.component.css']
})
export class ModifierReservationComponent implements OnInit {
  voyageId: number = 0;
  voyage: any;
  nombrePersonnes: number = 1;
  chaisesSelectionnees: number[] = [];
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';

  constructor(
    private route: ActivatedRoute,
    private voyagesService: VoyagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération des informations depuis les paramètres de requête
    this.route.queryParams.subscribe(params => {
      this.voyageId = params['id'];
      this.nombrePersonnes = params['nombrePersonnes'] || 1;
      this.nom = params['nom'] || '';
      this.prenom = params['prenom'] || '';
      this.email = params['email'] || '';
      this.telephone = params['telephone'] || '';
      const chaisesSelectionneesParam = params['chaisesSelectionnees'];

      if (chaisesSelectionneesParam) {
        this.chaisesSelectionnees = chaisesSelectionneesParam.split(',').map(Number);
      } else {
        this.chaisesSelectionnees = [];
      }
    });

    // Récupération des détails du voyage
    this.voyagesService.getVoyageById(this.voyageId).subscribe(data => {
      this.voyage = data;
    });
  }

  // Fonction pour sauvegarder les modifications et rediriger vers la page de paiement
  saveChanges() {
    this.router.navigate(['/paiement'], {
      queryParams: {
        id: this.voyageId,
        nombrePersonnes: this.nombrePersonnes,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        chaisesSelectionnees: this.chaisesSelectionnees.join(',')
      }
    });
  }

  // Fonction pour sélectionner ou désélectionner une chaise
  toggleSeatSelection(seatNumber: number) {
    const index = this.chaisesSelectionnees.indexOf(seatNumber);
    if (index > -1) {
      this.chaisesSelectionnees.splice(index, 1); // Deselect
    } else {
      this.chaisesSelectionnees.push(seatNumber); // Select
    }
  }
}
