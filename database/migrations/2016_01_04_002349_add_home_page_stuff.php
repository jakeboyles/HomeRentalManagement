<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHomePageStuff extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_page', function (Blueprint $table) {
            $table->increments('id');
            $table->text('main_text');
            $table->text('features');
            $table->string('address');
            $table->timestamps();
        });


        Schema::create('media', function (Blueprint $table) {
            $table->increments('id');
            $table->string('location');
            $table->string('extension');
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('home_page');
        Schema::drop('media');
    }
}
