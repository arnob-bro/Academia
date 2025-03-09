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
            CREATE PROCEDURE getScheduleOfAStudent(
                IN p_studentID VARCHAR(15),
                IN p_week_no INT
            )
            BEGIN
                SELECT 
                    s.scheduleID,
                    s.week_no,
                    s.day_of_week,
                    s.start_time,
                    s.end_time,
                    s.room_no,
                    s.facultyID,
                    f.name AS faculty_name,
                    c.courseID,
                    c.course_code,
                    c.course_name
                FROM enrollments e
                JOIN courses c ON e.courseID = c.courseID
                JOIN schedules s ON c.courseID = s.courseID
                JOIN faculties f ON s.facultyID = f.facultyID
                WHERE e.studentID = p_studentID
                AND s.week_no = p_week_no
                ORDER BY s.day_of_week, s.start_time;
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
        DROP PROCEDURE IF EXISTS getScheduleOfAStudent;
        
        ');
    }
};
