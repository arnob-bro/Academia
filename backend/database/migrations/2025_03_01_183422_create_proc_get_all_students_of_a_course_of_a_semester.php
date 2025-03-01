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
                IN p_courseID INT,
                IN p_enrollment_semester VARCHAR(255)
            )
            BEGIN
                SELECT s.studentID, s.name, s.profile_photo, s.department, s.institutional_email, s.current_semester
                FROM students s
                JOIN enrollments e ON s.studentID = e.studentID
                WHERE e.courseID = p_courseID AND e.enrollment_semester = p_enrollment_semester;
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
