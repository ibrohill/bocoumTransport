export interface Reservation {
  id: number;
  voyageur_id: number;
  voyageur_non: String;
  nom : string;
  dateReservation: string;
  statut: string;
  montantTotal: number;
  depart: string;
  arrivee: string;
  heure: string;
  nombrePersonnes: number;
  prix: number;
  chaises: number[];
  voyage?: {
    bus?: {
      nom: string;
    };
  };
  bus_id: number;
}

