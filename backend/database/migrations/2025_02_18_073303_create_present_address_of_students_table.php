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
            CREATE TABLE Present_Address_of_Students (
                log_id INT AUTO_INCREMENT PRIMARY KEY ,
                studentID VARCHAR(15) NOT NULL,
                Road_House_Flat_No VARCHAR(255),
                Country VARCHAR(100),
                Division VARCHAR(100),
                District VARCHAR(100),
                Thana VARCHAR(100),
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
        DB::statement('DROP TABLE IF EXISTS personal_information_of_students');
    }
};
