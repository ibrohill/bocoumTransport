<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('idReservation'); // ID unique pour chaque réservation
            $table->unsignedBigInteger('voyageur_id'); // Clé étrangère pour le voyageur
            $table->date('dateReservation'); // Date de la réservation
            $table->string('statut'); // Statut de la réservation (confirmée, annulée, etc.)
            $table->decimal('montantTotal', 10, 2); // Montant total de la réservation
            $table->string('depart'); // Lieu de départ
            $table->string('arrivee');
            $table->time('heure');
            $table->timestamps();

            $table->foreign('voyageur_id')
                ->references('id')
                ->on('voyageurs')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
