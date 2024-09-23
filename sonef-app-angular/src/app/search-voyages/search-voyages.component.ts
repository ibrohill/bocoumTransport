import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { CityService } from "../services/city.service";
import { VoyagesService } from "../services/voyages.service";
import { AuthService } from "../services/auth.service";
import { DialogflowService } from '../services/dialogflow.service';

@Component({
  selector: 'app-search-voyages',
  templateUrl: './search-voyages.component.html',
  styleUrls: ['./search-voyages.component.css']
})
export class SearchVoyagesComponent implements OnInit {

  cities: any[] = [];
  voyages: any[] = [];
  searchForm: FormGroup;
  filteredCitiesDepart: any[] = [];
  filteredCitiesArrivee: any[] = [];
  searchDepart: string = '';
  searchArrivee: string = '';
  isChatOpen: boolean = false;
  userMessage: string = '';
  responses: string[] = [];
  message: string = '';
  chatResponses: string[] = [];

  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: {
      x: 'right',
      y: 'center',
    },
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private voyageService: VoyagesService,
    private authService: AuthService,
    private dialogflowService: DialogflowService
  ) {
    this.searchForm = this.fb.group({
      depart: [''],
      arrivee: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    // console.log('SearchVoyagesComponent initialized');
    this.getCities();
    this.loadVoyages();
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat(): void {
    this.isChatOpen = false;
  }

  sendToDialogflow(message: string): void {
    this.dialogflowService.sendMessage(message).subscribe(response => {
      console.log('Response from Dialogflow:', response);
      this.chatResponses.push(response.fulfillmentText); // Afficher la réponse dans le chat
    }, error => {
      console.error('Error sending message:', error);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.sendToDialogflow(this.message); // Envoyer le message à Dialogflow
      this.message = ''; // Réinitialiser le message après envoi
    }
  }

  getCities(): void {
    // console.log('getCities called');
    this.cityService.getCities().subscribe({
      next: (data) => {
        // console.log('Cities retrieved:', data);
        this.cities = data;
        this.filteredCitiesDepart = data; // Initialiser la liste filtrée
        this.filteredCitiesArrivee = data; // Initialiser la liste filtrée
      },
      error: (err) => {
        this.notyf.error('Impossible de récupérer les villes.');
      }
    });
  }

  filterDepart(): void {
    const searchTerm = this.searchDepart.toLowerCase();
    this.filteredCitiesDepart = this.cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm)
    );
  }

  filterArrivee(): void {
    const searchTerm = this.searchArrivee.toLowerCase();
    this.filteredCitiesArrivee = this.cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm)
    );
  }

  onSearch(): void {
    const searchParams = this.searchForm.value;

    if (!searchParams.depart || !searchParams.arrivee || !searchParams.date) {
      this.notyf.error('Veuillez remplir tous les champs de recherche.');
      return;
    }

    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/resultatRecherche'], { queryParams: searchParams });
      } else {
        this.notyf.error('Vous devez être connecté pour effectuer une recherche.');
        this.router.navigate(['/login']);
      }
    });
  }

  loadVoyages(): void {
    this.voyageService.getVoyages().subscribe(data => {
      this.voyages = data;
    });
  }


}
