<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    // Schema::create('users', function (Blueprint $table) {
    //     $table->string('userID')->primary();
    //     $table->string('password');
    //     $table->string('role');
    //     $table->timestamps();
    // });
    DB::statement('
        CREATE TABLE users (
            userID VARCHAR(255) PRIMARY KEY,
            password VARCHAR(60) NOT NULL,
            role VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ');
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       DB::statement('DROP TABLE IF EXISTS users');
    }
};
