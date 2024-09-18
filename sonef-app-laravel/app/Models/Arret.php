<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arret extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'position',
        'voyage_id',
    ];

    public function voyage()
    {
        return $this->belongsTo(Voyage::class);
    }

}
