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
            CREATE PROCEDURE fetchEnrolledCoursesOfAStudentOfASemester(
                IN p_studentID VARCHAR(15)
            )
            BEGIN
                DECLARE current_sem VARCHAR(255);

                -- Fetch the current semester from the variables table
                SELECT current_semester INTO current_sem FROM variables LIMIT 1;

                -- Retrieve the enrolled courses for the student in the current semester
                SELECT 
                    e.enrollmentID,
                    e.enrollment_date,
                    e.enrollment_type,
                    e.enrollment_semester,
                    c.courseID,
                    c.course_code,
                    c.course_name,
                    c.department,
                    c.credits,
                    c.section,
                    c.number_of_vacant_seats,
                    c.facultyID
                FROM enrollments e
                JOIN courses c ON e.courseID = c.courseID
                WHERE e.studentID = p_studentID
                AND e.enrollment_semester = current_sem;
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
        DB::unprepared('
        DROP PROCEDURE IF EXISTS fetchEnrolledCoursesOfAStudentOfASemester;
        
        ');
    }
};
