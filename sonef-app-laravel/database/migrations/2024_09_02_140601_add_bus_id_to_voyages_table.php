<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBusIdToVoyagesTable extends Migration
{
    public function up()
    {
        Schema::table('voyages', function (Blueprint $table) {
            $table->unsignedBigInteger('bus_id')->nullable(); // Clé étrangère vers la table buses

            // Définir la clé étrangère
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('voyages', function (Blueprint $table) {
            $table->dropForeign(['bus_id']);
            $table->dropColumn('bus_id');
        });
    }
}
