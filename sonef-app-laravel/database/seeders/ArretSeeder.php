<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Arret;
use App\Models\Voyage;

class ArretSeeder extends Seeder
{
    public function run()
    {
        // Définir les quartiers pour chaque ville
        $quartiers = [
            'Dakar' => ['Plateau', 'Pikine', 'Yoff', 'Rufisque', 'Grand Dakar'],
            'Thiès' => ['Kayar', 'Tivaouane', 'Fandene', 'Mbour', 'Sandiara'],
            'Saint-Louis' => ['Guet Ndar', 'Léo', 'Pointe-Sarène', 'Gandon', 'Nord'],
            'Ziguinchor' => ['Bignona', 'Oussouye', 'Dandé', 'Tanaff', 'Casamance'],
            'Touba' => ['Dara', 'Touba Sérigne', 'Mbacké', 'Diourbel', 'Nguekhokh'],
            // Ajoutez d'autres villes et quartiers ici
        ];

        // Récupérez tous les voyages
        $voyages = Voyage::all();

        foreach ($voyages as $voyage) {
            // Obtenez les quartiers pour la ville de départ du voyage
            $quartiersVille = $quartiers[$voyage->depart] ?? [];

            if (!empty($quartiersVille)) {
                // Sélectionnez un quartier aléatoire pour cet arrêt
                $quartier = $quartiersVille[array_rand($quartiersVille)];

                // Créez un arrêt pour chaque voyage
                Arret::create([
                    'quartier' => $quartier,
                    'rue' => 'Rue ' . rand(1, 100), // Génère une rue aléatoire
                    'voyage_id' => $voyage->id,
                ]);
            }
        }
    }
}
