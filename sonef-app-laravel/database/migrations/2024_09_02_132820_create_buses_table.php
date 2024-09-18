<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusesTable extends Migration
{
    public function up()
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->id(); // Clé primaire avec le nom par défaut 'id'
            $table->string('nom');
            $table->integer('nombre_places');
            $table->string('status')->default('inactive'); // Status du bus (disponible ou non)
            $table->unsignedBigInteger('voyage_id')->nullable(); // Clé étrangère vers la table voyages
            $table->timestamps();

            // Définir la clé étrangère voyage_id
            $table->foreign('voyage_id')->references('id')->on('voyages')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('buses');
    }
}
