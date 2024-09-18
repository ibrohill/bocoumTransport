<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVoyagesTable extends Migration
{
    public function up()
    {
        Schema::create('voyages', function (Blueprint $table) {
            $table->id();

            $table->string('depart');
            $table->string('arrivee');
            $table->date('date');
            $table->time('heure')->default('08:00');
            $table->integer('places_disponibles')->default(56);
            $table->integer('prix');
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('voyages');
    }
}
