<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiteLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('site_menu_id')->unsigned();
            $table->string('title');
            $table->string('text');
            $table->string('link');
            $table->set('type', ['absolute', 'relative'])->default("relative");
            $table->string('about')->nullable();
            $table->timestamps();
            $table->foreign('site_menu_id')->references('id')->on('site_menus');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_links');
    }
}
