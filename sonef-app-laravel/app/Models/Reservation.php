<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $primaryKey = 'idReservation';
    public $incrementing = true;
    protected $fillable = [
        'voyageur_id',
        'dateReservation',
        'statut',
        'montantTotal',
        'depart',
        'arrivee',
        'heure',
        'nombrePersonnes',
        'prix',
        'chaises',
    ];


    public function voyageur()
    {
        return $this->belongsTo(Voyageur::class, 'voyageur_id', 'idVoyageur');
    }

    protected $casts = [
        'chaises' => 'array', // Cast JSON to array
    ];

    public function voyage()
    {
        return $this->belongsTo(Voyage::class, 'voyage_id');
    }

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'bus_id');
    }
}
