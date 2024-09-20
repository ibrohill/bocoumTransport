<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voyage;
use App\Models\Bus;
use Carbon\Carbon;

class VoyageSeeder extends Seeder
{
    public function run()
    {
        $buses = Bus::all();
        $totalBuses = $buses->count();

        if ($totalBuses == 0) {
            $this->command->info('No buses found. Please create buses before creating voyages.');
            return;
        }

        $cities = [
            'Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Touba',
            'Kaolack', 'Mbour', 'Matam', 'Louga', 'Dahra Salam',
            'Kolda', 'Tambacounda', 'Diourbel', 'Podor', 'Kaffrine',
            'Fatick', 'Sédhiou', 'Kédougou', 'Richard-Toll'
        ];

        $startDate = Carbon::today();
        $endDate = $startDate->copy()->addDays(6); // Générer des voyages pour 7 jours

        $voyageIndex = 0;
        $priceMap = [];

        // Prix prédéfinis pour certaines routes spécifiques
        $priceOptions = [3000, 4000, 5000, 6000, 7000];

        for ($date = $startDate; $date <= $endDate; $date->addDay()) {
            foreach ($cities as $index => $city) {
                $bus = $buses->get($voyageIndex % $totalBuses);
                $destination = $cities[($index + 1) % count($cities)];

                if (isset($priceMap[$city][$destination])) {
                    $price = $priceMap[$city][$destination];
                } else {
                    // Définir un prix en fonction de la route
                    if ($city == 'Dakar' && $destination == 'Thiès') {
                        $price = 3000;
                    } elseif ($city == 'Dakar' && $destination == 'Saint-Louis') {
                        $price = 5000;
                    } else {
                        $price = $priceOptions[array_rand($priceOptions)];
                    }

                    $priceMap[$city][$destination] = $price;
                }

                // Statut par défaut 'actif'
                $status = 'actif';

                // Créer deux voyages par jour (à 08h00 et 17h00)
                Voyage::create([
                    'depart' => $city,
                    'arrivee' => $destination,
                    'date' => $date->toDateString(),
                    'heure' => '08:00:00',
                    'places_disponibles' => 56,
                    'prix' => $price,
                    'status' => $status, // Statut par défaut ici
                    'bus_id' => $bus->id,
                ]);

                Voyage::create([
                    'depart' => $city,
                    'arrivee' => $destination,
                    'date' => $date->toDateString(),
                    'heure' => '17:00:00',
                    'places_disponibles' => 56,
                    'prix' => $price,
                    'status' => $status, // Statut par défaut pour le deuxième voyage aussi
                    'bus_id' => $bus->id,
                ]);

                $voyageIndex++;
            }
        }
    }
}



//php artisan db:seed --class=VoyageSeeder
//allow pasting
//localStorage.removeItem('access_token');
// 'Kaolack',
//             'Mbour',
//             'Matam',
//             'Kolda',
//             'Tambacounda',
//             'Diourbel',
//             'Podor',
//             'Kaffrine',
//             'Fatick',
//             'Sédhiou',
//             'Kédougou',
//             'Richard-Toll',
//             'Guédiawaye',
//             'Pikine',
//             'Rufisque',
//             'Tivaouane',
//             'Mbacké',
//             'Joal-Fadiouth',
//             'Ngor',
//             'Vélingara',
//             'Bakel',
//             'Bignona',
//             'Dagana',
//             'Bambey',
//             'Goudomp',
//             'Koungheul',
//             'Kébémer',
//             'Linguère',
//             'Meckhe',
//             'Nioro du Rip',
//             'Oussouye',
//             'Pout',
//             'Séssène',
//             'Sokone',
//             'Thiadiaye',
//             'Thiès-Nones',
//             'Tivaouane',
//             'Yoff'
