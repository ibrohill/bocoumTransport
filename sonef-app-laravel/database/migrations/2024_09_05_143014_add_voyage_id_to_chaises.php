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
        Schema::table('chaises', function (Blueprint $table) {
            $table->unsignedBigInteger('voyage_id')->default(1);// Permettre null pour voyage_id

        });
    }

    public function down()
    {
        Schema::table('chaises', function (Blueprint $table) {
            $table->dropColumn('voyage_id');
        });
    }

};
