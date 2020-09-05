<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiteMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_menus', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('placement_name');
            $table->string('parent_id');
            $table->string('about')->nullable();
            $table->boolean('is_submenu')->default(false);
            $table->timestamps();
            // $table->foreign('parent_id')->references('id')->on('site_menus');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_menus');
    }
}
