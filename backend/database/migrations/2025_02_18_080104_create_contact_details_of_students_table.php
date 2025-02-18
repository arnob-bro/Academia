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
            CREATE TABLE contact_details_of_students (
                log_id INT AUTO_INCREMENT PRIMARY KEY,
                studentID VARCHAR(15) NOT NULL,
                mobile_number VARCHAR(20),
                phone_number VARCHAR(20),
                personal_email VARCHAR(255),
                institutional_email VARCHAR(255),
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
        DB::statement('DROP TABLE IF EXISTS contact_details_of_students');
    }
};
