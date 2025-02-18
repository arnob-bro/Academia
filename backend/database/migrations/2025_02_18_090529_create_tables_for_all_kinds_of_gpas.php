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
            CREATE TABLE course_grade_points (
                course_grade_pointID INT AUTO_INCREMENT PRIMARY KEY,
                semester VARCHAR(255) NOT NULL,
                grade_in_char VARCHAR(5) NOT NULL,
                grade_in_num DECIMAL(4,2) NOT NULL,
                studentID VARCHAR(15) NOT NULL,
                courseID INT NOT NULL,
                FOREIGN KEY (studentID) REFERENCES students(studentID) ON DELETE CASCADE,
                FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE
            );
        ');

         DB::statement('
           CREATE TABLE gpas (
                gpaID INT AUTO_INCREMENT PRIMARY KEY,
                semester VARCHAR(255) NOT NULL,
                gpa DECIMAL(4,2) NOT NULL,
                credits_completed FLOAT NOT NULL,
                studentID VARCHAR(15) NOT NULL,
                FOREIGN KEY (studentID) REFERENCES students(studentID) ON DELETE CASCADE
            );
        ');

         DB::statement('
            CREATE TABLE cgpas (
                cgpaID INT AUTO_INCREMENT PRIMARY KEY,
                semester VARCHAR(255) NOT NULL,
                cgpa DECIMAL(4,2) NOT NULL,
                cumulative_credits_completed FLOAT NOT NULL,
                studentID VARCHAR(15) NOT NULL,
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
        DB::statement('DROP TABLE IF EXISTS cgpas');
        DB::statement('DROP TABLE IF EXISTS gpas');
        DB::statement('DROP TABLE IF EXISTS course_grade_points');
    }
};
