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
            CREATE TABLE courses (
                courseID INT AUTO_INCREMENT PRIMARY KEY,
                course_code VARCHAR(50) NOT NULL,
                course_name VARCHAR(255) NOT NULL,
                department VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                credits INT NOT NULL,
                section VARCHAR(10) NOT NULL,
                facultyID VARCHAR(15) NOT NULL,
                FOREIGN KEY (facultyID) REFERENCES faculties(facultyID) ON DELETE CASCADE
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
        DB::statement('DROP TABLE IF EXISTS courses');
    }
};
