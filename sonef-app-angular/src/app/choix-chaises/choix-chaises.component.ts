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

  // Infos du voyage
  voyageId: number = 0;
  nombrePersonnes: number = 1;
  depart: string = '';
  arrivee: string = '';
  heure: string = '';

  // Formulaire : CNI + Téléphone
  cni: string = '';
  telephone: string = '';

  // État
  formSaisi: boolean = false;
  voyageurId: number | null = null;
  chaises: any[] = [];

  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: { x: 'right', y: 'top' }
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voyageurService: VoyageurService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyageId = +params['id'] || 0;
      this.nombrePersonnes = +params['nombrePersonnes'] || 1;
      this.depart = params['depart'] || '';
      this.arrivee = params['arrivee'] || '';
      this.heure = params['heure'] || '';

      this.loadChaises();
    });
  }

  loadChaises() {
    this.reservationService.getChaisesDisponibles(this.voyageId).subscribe(
      chaises => {
        this.chaises = chaises.map(chaise => ({
          ...chaise,
          selected: false,
          disponible: chaise.disponible
        }));
      },
      error => {
        console.error('Erreur de chargement des chaises:', error);
        this.notyf.error('Impossible de charger les chaises.');
      }
    );
  }

  onSubmit() {
    if (this.cni.trim() !== '' && this.telephone.trim() !== '') {
      const voyageurData = {
        cni: this.cni,
        telephone: this.telephone
      };

      this.voyageurService.addVoyageur(voyageurData).subscribe(
        response => {
          this.voyageurId = response.id;
          this.notyf.success('Informations enregistrées.');
          this.formSaisi = true;
        },
        error => {
          console.error('Erreur:', error);
          this.notyf.error('Échec de l\'enregistrement.');
        }
      );
    } else {
      this.notyf.error('CNI et téléphone requis.');
    }
  }

  selectChaise(chaise: any) {
    if (!chaise.disponible) return;

    if (chaise.selected) {
      chaise.selected = false;
    } else if (this.getSelectedChairs().length < this.nombrePersonnes) {
      chaise.selected = true;
    } else {
      this.notyf.error(`Vous ne pouvez choisir que ${this.nombrePersonnes} chaise(s).`);
    }
  }

  initiatePayment() {
    const selectedChairs = this.getSelectedChairs();

    if (this.voyageurId && selectedChairs.length === this.nombrePersonnes) {
      this.router.navigate(['/paiement'], {
        queryParams: {
          id: this.voyageId,
          nombrePersonnes: this.nombrePersonnes,
          chaisesSelectionnees: selectedChairs.map(c => c.id).join(','),
          voyageur_id: this.voyageurId,
          cni: this.cni,
          telephone: this.telephone,
          depart: this.depart,
          arrivee: this.arrivee,
          heure: this.heure
        }
      });
    } else {
      this.errorMessage = 'Sélectionnez vos chaises.';
      this.notyf.error(this.errorMessage);
    }
  }

  getChaisesRows(): any[][] {
    const rows = [];
    const perRow = 4;
    for (let i = 0; i < this.chaises.length; i += perRow) {
      rows.push(this.chaises.slice(i, i + perRow));
    }
    return rows;
  }

  getSelectedChairs() {
    return this.chaises.filter(c => c.selected);
  }
}
