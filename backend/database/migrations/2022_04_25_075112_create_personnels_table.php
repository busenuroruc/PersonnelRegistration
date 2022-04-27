<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonnelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->string('personnel_name');
            $table->string('personnel_surname');
            $table->date('personnel_birthday');
            $table->string('personnel_birthplace');
            $table->unsignedBigInteger('address_id');
            $table->timestamps();
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade')->onUpdate('cascade');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('personnels');
        Schema::enableForeignKeyConstraints();
    }
}
