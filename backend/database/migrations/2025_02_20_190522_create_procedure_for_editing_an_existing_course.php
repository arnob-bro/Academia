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
            CREATE PROCEDURE EditAnExistingCourse(
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
                DECLARE courseExists INT;

                -- Check if the course exists
                SELECT COUNT(*) INTO courseExists FROM courses WHERE course_code = p_course_code AND section = p_section;
                IF courseExists = 0 THEN
                    SIGNAL SQLSTATE "45000" 
                    SET MESSAGE_TEXT = "Course not found";
                END IF;


                -- Update the course details
                UPDATE courses
                SET 
                    course_code = p_course_code,
                    course_name = p_course_name,
                    department = p_department,
                    description = p_description,
                    credits = p_credits,
                    section = p_section,
                    facultyID = p_facultyID,
                    number_of_vacant_seats = p_number_of_vacant_seats,
                    prerequisite_course_code = p_prerequisite_course_code
                WHERE course_code = p_course_code AND section = p_section;

                SELECT "Course updated successfully" AS status;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS EditAnExistingCourse');
    }
};
