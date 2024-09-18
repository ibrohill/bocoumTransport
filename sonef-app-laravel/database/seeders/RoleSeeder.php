<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Create default roles
        Role::updateOrCreate(['name' => 'admin'], ['name' => 'admin']);
        Role::updateOrCreate(['name' => 'user'], ['name' => 'user']);
    }
}
