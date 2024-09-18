<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id('idPaiement');
            $table->unsignedBigInteger('reservation_id');
            $table->double('montant', 8, 2);
            $table->date('datePaiement');
            $table->string('modePaiement');
            $table->timestamps();
            $table->string('ref_command')->nullable();
            $table->foreign('reservation_id')->references('idReservation')->on('reservations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
