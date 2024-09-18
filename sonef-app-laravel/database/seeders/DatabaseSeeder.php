<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // D'abord, créer les villes
        $this->call(CitiesTableSeeder::class);

        // Ensuite, créer les voyages
        $this->call(VoyageSeeder::class);

        // Ensuite, créer les bus
        $this->call(BusSeeder::class);

        // Enfin, créer les chaises
        $this->call(ChaiseSeeder::class);
    }
}
