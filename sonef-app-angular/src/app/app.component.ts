import { Component, OnInit } from '@angular/core';
import { VoyagesService } from './services/voyages.service';
import { Voyage } from './models/voyage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  voyages: Voyage[] = [];

  constructor(private voyagesService: VoyagesService) {}

  ngOnInit(): void {
    const searchParams = {
      depart: '',  // Exemple de valeurs par défaut
      arrivee: '',
      date: '',
      nombre_de_personnes: 50
    };

    // Vérifiez que tous les champs sont définis
    // if (searchParams.depart && searchParams.arrivee && searchParams.date && searchParams.nombre_de_personnes) {
    //   this.voyagesService.rechercherVoyages(searchParams).subscribe(data => {
    //     this.voyages = data;
    //   }, error => {
    //     console.error('Erreur lors de la recherche des voyages : ', error);
    //   });
    // } else {
    //   console.error('Certains paramètres de recherche ne sont pas définis.');
    // }
  }
}
