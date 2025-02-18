<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        DB::statement('
            CREATE TABLE faculties (
                facultyID VARCHAR(15) PRIMARY KEY ,
                name VARCHAR(255) NOT NULL,
                profile_photo VARCHAR(255),
                department VARCHAR(100) NOT NULL,
                rank VARCHAR(100),
                administrative_role VARCHAR(100)
                );
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP TABLE IF EXISTS faculties');
    }
};
