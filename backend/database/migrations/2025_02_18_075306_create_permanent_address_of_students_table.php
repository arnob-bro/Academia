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
            CREATE TABLE permanent_address_of_students (
                log_id INT AUTO_INCREMENT PRIMARY KEY ,
                studentID VARCHAR(15) NOT NULL,
                road_house_flat_no VARCHAR(255),
                country VARCHAR(100),
                division VARCHAR(100),
                district VARCHAR(100),
                thana VARCHAR(100),
                FOREIGN KEY (studentID) REFERENCES students(studentID) ON DELETE CASCADE
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
        DB::statement('DROP TABLE IF EXISTS permanent_address_of_students');
    }
};
