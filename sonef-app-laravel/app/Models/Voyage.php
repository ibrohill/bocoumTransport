<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    use HasFactory;

    protected $fillable = ['depart', 'arrivee', 'date', 'heure_depart', 'bus_id'];

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'bus_id');
    }

    public function chaises()
    {
        return $this->hasMany(Chaise::class, 'voyage_id');
    }
}
