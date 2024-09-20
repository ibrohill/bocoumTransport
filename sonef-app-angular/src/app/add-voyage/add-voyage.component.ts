import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoyagesService } from '../services/voyages.service';
import { Router } from '@angular/router';
import { CityService } from "../services/city.service";
import { BusService } from "../services/bus.service"; // BusService pour récupérer les bus
import { Notyf } from 'notyf';

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
  styleUrls: ['./add-voyage.component.css']
})
export class AddVoyageComponent implements OnInit {
  voyageForm: FormGroup;
  cities: any[] = [];
  buses: any[] = []; // Ajouter la liste des bus
  private notyf = new Notyf();

  constructor(
    private fb: FormBuilder,
    private voyagesService: VoyagesService,
    private router: Router,
    private cityService: CityService,
    private busService: BusService // Service pour récupérer les bus
  ) {
    this.voyageForm = this.fb.group({
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      places_disponibles: [56, Validators.required],
      prix: ['', Validators.required],
      bus_id: ['', Validators.required], // Associer un bus
    });
  }

  ngOnInit(): void {
    // Récupérer les villes
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });

    // Récupérer les bus
    this.busService.getBuses().subscribe(data => {
      this.buses = data;
    });
  }

  onSubmit(): void {
    // Affiche les valeurs du formulaire dans la console
    console.log('Données du formulaire:', this.voyageForm.value);

    // Vérifie si le formulaire est valide
    if (this.voyageForm.valid) {
      this.voyagesService.ajouterVoyage(this.voyageForm.value).subscribe({
        next: (response) => {
          console.log('Réponse du serveur:', response); // Affiche la réponse du serveur dans la console
          this.notyf.success('Voyage ajouté avec succès');
          this.router.navigate(['/recherche']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du voyage:', error); // Affiche l'erreur dans la console
          this.notyf.error('Erreur lors de l\'ajout du voyage');
        }
      });
    } else {
      console.warn('Le formulaire est invalide:', this.voyageForm.errors); // Affiche un avertissement si le formulaire est invalide
    }
  }

}
