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
                IN course_code VARCHAR(50),
                IN course_name VARCHAR(255),
                IN department VARCHAR(100),
                IN description TEXT,
                IN credits INT,
                IN section VARCHAR(10),
                IN facultyID VARCHAR(15)
            )
            BEGIN
                
                -- Check if course_code and section combination is unique (excluding current course)
                IF (SELECT COUNT(*) FROM courses WHERE course_code = course_code AND section = section) > 0 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Another course with the same course_code and section already exists";
                END IF;

                INSERT INTO courses (course_code, course_name, department, description, credits, section, facultyID)
                VALUES (course_code, course_name, department, description, credits, section, facultyID);

                
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
