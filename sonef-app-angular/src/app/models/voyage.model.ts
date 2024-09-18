
export interface Voyage {
  id: number;
  depart: string;
  arrivee: string;
  date: string;
  nombre_de_personnes: number;
  places_disponibles: number;
  heure: string;
  prix_par_personne: number;
  idBus?: number; // Assurez-vous que cette propriété existe, ou modifiez le nom selon le modèle de votre API
  bus_nom?: string;
}

