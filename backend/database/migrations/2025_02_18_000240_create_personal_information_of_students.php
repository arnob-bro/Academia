<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        DB::statement('
            CREATE TABLE personal_information_of_students (
                log_id INT AUTO_INCREMENT PRIMARY KEY,
                studentID VARCHAR(15) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                father_name VARCHAR(255) NULL,
                mother_name VARCHAR(255) NULL,
                birth_date DATE NOT NULL,
                nid VARCHAR(20) NULL,
                birth_registration_No VARCHAR(20) NULL,
                gender ENUM(\'Male\', \'Female\', \'Other\') NOT NULL,
                religion VARCHAR(50) NULL,
                blood_group VARCHAR(5) NULL,
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
