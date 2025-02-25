<?php

use Illuminate\Database\Migrations\Migration;
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
        DB::unprepared('
            CREATE PROCEDURE CreateNewCourse(
                IN p_course_code VARCHAR(50),
                IN p_course_name VARCHAR(255),
                IN p_department VARCHAR(100),
                IN p_description TEXT,
                IN p_credits INT,
                IN p_section VARCHAR(10),
                IN p_facultyID VARCHAR(15),
                IN p_number_of_vacant_seats INT,
                IN p_prerequisite_course_code VARCHAR(50)
            )
            BEGIN
                
                -- Check if course_code and section combination is unique (excluding current course)
                IF (SELECT COUNT(*) FROM courses WHERE course_code = p_course_code AND section = p_section) > 0 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Another course with the same course_code and section already exists";
                END IF;

                INSERT INTO courses (course_code, course_name, department, description, credits, section, facultyID, number_of_vacant_seats, prerequisite_course_code)
                VALUES (p_course_code, p_course_name, p_department, p_description, p_credits, p_section, p_facultyID, p_number_of_vacant_seats, p_prerequisite_course_code);

                
            END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS CreateNewCourse');
    }
};
