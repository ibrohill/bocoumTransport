import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-edit-voyage',
  templateUrl: './edit-voyage.component.html',
  styleUrls: ['./edit-voyage.component.css']
})
export class EditVoyageComponent implements OnInit {
  voyage: any = {}; // Initialisez le voyage

  private notyf: Notyf;

  constructor(
    private route: ActivatedRoute,
    private voyageService: VoyagesService,
    private router: Router
  ) {
    this.notyf = new Notyf();
  }

  ngOnInit() {
    this.getVoyage();
  }

  getVoyage() {
    const id = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID du voyage
    this.voyageService.getVoyageById(id).subscribe(data => {
      this.voyage = data; // Initialiser les données du voyage
    });
  }

  updateVoyage() {
    const id = this.voyage.id; // Assurez-vous que l'ID est présent dans l'objet voyage
    this.voyageService.updateVoyage(id, this.voyage).subscribe(() => {
      this.notyf.success('Voyage modifié avec succès');
      this.router.navigate(['/admin']); // Redirigez vers la liste des voyages
    });
  }
}
