import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoyagesService } from '../services/voyages.service';
import { Router } from '@angular/router';
import { CityService } from "../services/city.service";
import { Notyf } from 'notyf'; // Importation de Notyf

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
  styleUrls: ['./add-voyage.component.css']
})
export class AddVoyageComponent implements OnInit {
  voyageForm: FormGroup;
  cities: any[] = [];
  private notyf = new Notyf({
    duration: 3000, // Durée d'affichage de la notification
    ripple: true,   // Effet ripple
    position: {
      x: 'right',
      y: 'top',
    },
  });


  constructor(
    private fb: FormBuilder,
    private voyagesService: VoyagesService,
    private router: Router,
    private cityService: CityService
  ) {
    this.voyageForm = this.fb.group({
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSubmit(): void {
    if (this.voyageForm.valid) {
      this.voyagesService.ajouterVoyage(this.voyageForm.value).subscribe({
        next: (response) => {
          console.log('Voyage ajouté avec succès:', response);
          this.notyf.success('Voyage ajouté avec succès'); // Notification de succès
          this.router.navigate(['/recherche']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du voyage:', error);
          this.notyf.error('Une erreur est survenue lors de l\'ajout du voyage'); // Notification d'erreur
        }
      });
    } else {
      console.log('Formulaire invalide');
      this.notyf.error('Formulaire invalide. Veuillez remplir tous les champs requis.'); // Notification d'erreur pour formulaire invalide
    }
  }

}
