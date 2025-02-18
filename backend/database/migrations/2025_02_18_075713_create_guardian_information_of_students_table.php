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
            CREATE TABLE guardian_information_of_students (
                log_id INT AUTO_INCREMENT PRIMARY KEY ,
                studentID VARCHAR(15) NOT NULL,
                guardian_name VARCHAR(255),
                guardian_mobile VARCHAR(20),
                guardian_email VARCHAR(255),
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
        DB::statement('DROP TABLE IF EXISTS guardian_information_of_students');
    }
};
