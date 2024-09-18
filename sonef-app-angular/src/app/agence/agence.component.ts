import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const map = L.map('map').setView([14.6928, -17.4467], 13); // Coordonnées de Dakar

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([14.6928, -17.4467]).addTo(map)
      .bindPopup('Localisation de l\'agence')
      .openPopup();
  }
}
