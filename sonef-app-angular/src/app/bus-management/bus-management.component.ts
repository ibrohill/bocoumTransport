import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { VoyagesService } from '../services/voyages.service'; // Import the voyage service
import { Notyf } from 'notyf';

@Component({
  selector: 'app-bus-management',
  templateUrl: './bus-management.component.html',
  styleUrls: ['./bus-management.component.css']
})
export class BusManagementComponent implements OnInit {
  buses: any[] = [];
  voyages: any[] = []; // Add voyages array
  busTotal = 0;
  busActifs = 0;
  busInactifs = 0;
  errorMessage: string | null = null;
  newBus = { nom: '', nombre_places: '', status: '', voyage_id: '' }; // Add voyage_id here
  private notyf = new Notyf({
    duration: 3000,
    ripple: true,
    position: {
      x: 'right',
      y: 'center',
    },
  });

  constructor(private busService: BusService, private voyageService: VoyagesService) {} // Inject VoyageService

  ngOnInit(): void {
    this.getBuses();
    this.getVoyages(); // Fetch the list of voyages when component initializes
  }


  getBuses() {
    this.busService.getBuses().subscribe(data => {
      this.buses = data;
      console.log('Premier bus:', this.buses[0]); // Vérifiez la structure du premier bus ici
      this.calculateBusStatistics();
    }, error => {
      console.error('Erreur lors de la récupération des bus', error);
    });
  }


  calculateBusStatistics() {
    console.log('Buses:', this.buses);
    if (!this.buses || this.buses.length === 0) {
      this.busTotal = 0;
      this.busActifs = 0;
      this.busInactifs = 0;
      return;
    }

    this.busTotal = this.buses.length;

    // Si la propriété est un booléen
    this.busActifs = this.buses.filter(bus => bus.isActive === true).length;
    this.busInactifs = this.buses.filter(bus => bus.isActive === false).length;

    console.log('Bus actifs:', this.busActifs);
    console.log('Bus inactifs:', this.busInactifs);
  }


  getVoyages(): void {
    this.voyageService.getVoyages().subscribe(
      (data) => {
        console.log('Voyages received:', data); // Debugging line
        this.voyages = data;
      },
      (error) => {
        console.error('Error fetching voyages:', error);
      }
    );
  }

  addBus(): void {
    this.busService.addBus(this.newBus).subscribe(
      () => {
        this.notyf.success('Bus ajouté avec succès!');
        this.getBuses();
        this.newBus = { nom: '', nombre_places: '', status: '', voyage_id: '' }; // Reset the form
      },
      (error) => {
        if (error.status === 422) {
          console.error('Erreur de validation:', error.error.errors);
        } else {
          console.error('Erreur lors de l\'ajout du bus:', error);
        }
        this.notyf.error('Erreur lors de l\'ajout du bus');
      }
    );
  }



  activateBus(id: number): void {
    this.busService.activateBus(id).subscribe(() => {
      this.getBuses();
      this.calculateBusStatistics(); // Update stats after activating
    });
  }

  desactiverBus(id: number): void {
    this.busService.deactivateBus(id).subscribe(() => {
      this.getBuses();
      this.calculateBusStatistics(); // Update stats after deactivating
    });
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => {
      this.getBuses();
      this.calculateBusStatistics(); // Update stats after deletion
    });
  }


  // desactiverBus(busId: number) {
  //   if (confirm('Êtes-vous sûr de vouloir désactiver ce bus ?')) {
  //     this.busService.deactivateBus(busId).subscribe(response => {
  //       console.log('Réponse du serveur après désactivation:', response); // Vérifiez la réponse du serveur
  //       this.notyf.success('Bus désactivé avec succès');
  //       this.getBuses(); // Recharger les bus après désactivation
  //     }, error => {
  //       console.error('Erreur lors de la désactivation du bus', error);
  //       this.notyf.error('Erreur lors de la désactivation du bus');
  //     });
  //   }
  // }
  //
  // deleteBus(busId: number) {
  //   if (busId) {
  //     this.busService.deleteBus(busId).subscribe(
  //       response => {
  //         this.notyf.success('Bus supprimer avec  success');
  //       },
  //       error => {
  //         this.notyf.error('Error lors de la suppresion du bus');
  //       }
  //     );
  //   } else {
  //     console.error('Invalid bus ID');
  //   }
  // }

}
