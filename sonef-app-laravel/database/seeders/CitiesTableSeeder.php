<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesTableSeeder extends Seeder
{
    public function run()
    {
        $cities = [
            'Dakar',
            'Thiès',
            'Saint-Louis',
            'Ziguinchor',
            'Touba',
            'Kaolack',
            'Mbour',
            'Matam',
            'Louga',
            'Dahra Salam',
            'Kolda',
            'Tambacounda',
            'Diourbel',
            'Podor',
            'Kaffrine',
            'Fatick',
            'Sédhiou',
            'Kédougou',
            'Richard-Toll',
        ];

        foreach ($cities as $city) {
            DB::table('cities')->insert([
                'name' => $city,
            ]);
        }
    }
}
