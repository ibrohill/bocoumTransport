<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bus;

class BusSeeder extends Seeder
{
    public function run()
    {
        // Créer 18 bus
        for ($i = 1; $i <= 36; $i++) {
            Bus::create([
                'nom' => 'Bus ' . chr(64 + $i), // Nom des bus : Bus A, Bus B, etc.
                'nombre_places' => 56,
                'status' => 'active',
            ]);
        }
    }
}
