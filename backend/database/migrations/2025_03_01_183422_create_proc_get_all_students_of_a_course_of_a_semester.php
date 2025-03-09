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
            CREATE PROCEDURE getAllStudentsOfACourseOfASemester(
                IN p_courseID INT
            )
            BEGIN
                DECLARE v_current_semester VARCHAR(255);

                -- Fetch the current semester from the variables table
                SELECT current_semester INTO v_current_semester
                FROM variables
                WHERE log_id = 1;

                -- Retrieve students enrolled in the given course for the current semester
                SELECT s.studentID, s.name, s.profile_photo, s.department, s.institutional_email, s.current_semester
                FROM students s
                JOIN enrollments e ON s.studentID = e.studentID
                WHERE e.courseID = p_courseID AND e.enrollment_semester = v_current_semester;
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
        DROP PROCEDURE IF EXISTS getAllStudentsOfACourseOfASemester;
        
        ');
    }
};
