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
        Schema::table('reservations', function (Blueprint $table) {
            $table->unsignedInteger('nombrePersonnes')->after('montantTotal');
            $table->decimal('prix', 10, 2)->after('nombrePersonnes');
        });
    }
    
    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('nombrePersonnes');
            $table->dropColumn('prix');
        });
    }
    
};
