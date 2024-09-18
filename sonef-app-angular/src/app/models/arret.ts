// src/app/models/arret.model.ts
export interface Arret {
  id: number;
  nom: string;
  position: string;
  voyage_id: number;
  voyage?: {
    depart: string;
    arrivee: string;
  };
}
