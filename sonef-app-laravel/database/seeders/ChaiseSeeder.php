<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chaise;
use App\Models\Bus;
use App\Models\Voyage;

class ChaiseSeeder extends Seeder
{
    public function run()
    {
        $buses = Bus::all();
        $voyages = Voyage::all();

        if ($buses->isEmpty() || $voyages->isEmpty()) {
            $this->command->info('No buses or voyages found. Please create buses and voyages before creating chairs.');
            return;
        }

        foreach ($buses as $bus) {
            foreach ($voyages as $voyage) {
                for ($i = 1; $i <= $bus->nombre_places; $i++) {
                    Chaise::create([
                        'bus_id' => $bus->id,
                        'numero' => $i,
                        'disponible' => true,
                        'reservee' => false,
                        'voyage_id' => $voyage->id,
                    ]);
                }
            }
        }
    }
}
