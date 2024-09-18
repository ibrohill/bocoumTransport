<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'nombre_places', 'status'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'bus_id');
    }

    public function chaises()
    {
        return $this->hasMany(Chaise::class, 'bus_id');
    }
}
