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
        $endDate = $startDate->copy()->addDays(6); // Next 7 days

        $voyageIndex = 0;
        $priceMap = []; // To store the prices for each route

        // Define exact price options
        $priceOptions = [3000, 4000, 5000, 6000, 7000];

        // Loop through each day in the next 7 days
        for ($date = $startDate; $date <= $endDate; $date->addDay()) {
            foreach ($cities as $index => $city) {
                // Select the bus based on the current voyage index and total number of buses
                $bus = $buses->get($voyageIndex % $totalBuses);
                $destination = $cities[($index + 1) % count($cities)]; // Circular route

                // Check if a price has already been set for this route
                if (isset($priceMap[$city][$destination])) {
                    $price = $priceMap[$city][$destination];
                } else {
                    // Set price based on the route
                    if ($city == 'Dakar' && $destination == 'Thiès') {
                        $price = 3000;
                    } elseif ($city == 'Dakar' && $destination == 'Saint-Louis') {
                        $price = 5000;
                    } else {
                        // Select a random price from the predefined options
                        $price = $priceOptions[array_rand($priceOptions)];
                    }

                    // Store the price for this route to ensure consistency for both times (08:00 and 17:00)
                    $priceMap[$city][$destination] = $price;
                }

                // Create two voyages per day per city
                Voyage::create([
                    'depart' => $city,
                    'arrivee' => $destination,
                    'date' => $date->toDateString(),
                    'heure' => '08:00:00',
                    'places_disponibles' => 56,
                    'prix' => $price,
                    'status' => 'active',
                    'bus_id' => $bus->id,
                ]);

                Voyage::create([
                    'depart' => $city,
                    'arrivee' => $destination,
                    'date' => $date->toDateString(),
                    'heure' => '17:00:00',
                    'places_disponibles' => 56,
                    'prix' => $price,
                    'status' => 'active',
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
