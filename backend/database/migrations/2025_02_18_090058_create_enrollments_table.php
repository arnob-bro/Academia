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
            CREATE TABLE enrollments (
                enrollmentID INT AUTO_INCREMENT PRIMARY KEY,
                enrollment_date DATE NOT NULL,
                enrollment_semester VARCHAR(255) NOT NULL,
                studentID VARCHAR(15) NOT NULL,
                courseID INT NOT NULL,
                FOREIGN KEY (studentID) REFERENCES students(studentID) ON DELETE CASCADE,
                FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE
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
        DB::statement('DROP TABLE IF EXISTS enrollments');
    }
};
