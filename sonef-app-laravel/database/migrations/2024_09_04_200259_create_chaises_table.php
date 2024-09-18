<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChaisesTable extends Migration
{
    public function up()
    {
        Schema::create('chaises', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bus_id'); // Clé étrangère vers la table buses
            $table->integer('numero'); // Numéro de la chaise
            $table->boolean('disponible')->default(true); // Disponibilité de la chaise
            $table->timestamps();

            // Définir la relation avec la table des buses
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('chaises');
    }
}
