<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chaise extends Model
{
    use HasFactory;

    protected $fillable = ['bus_id', 'numero', 'disponible', 'reservee', 'voyage_id'];

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'bus_id');
    }

    public function voyage()
    {
        return $this->belongsTo(Voyage::class, 'voyage_id');
    }
}

