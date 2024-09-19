// src/app/models/arret.model.ts
export interface Arret {
  id: number;
  quartier: string;
  rue: string;
  voyage_id: number;
  voyage?: {
    depart: string;
    arrivee: string;
  };
}
