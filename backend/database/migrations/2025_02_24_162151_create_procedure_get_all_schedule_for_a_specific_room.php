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
            CREATE PROCEDURE getAllScheduleOfASpecificRoomOfASpecificWeek(
                IN p_week_no INT,
                IN p_room_no VARCHAR(50)
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
                FROM schedules s
                JOIN courses c ON s.courseID = c.courseID
                JOIN faculties f ON s.facultyID = f.facultyID
                WHERE s.week_no = p_week_no
                AND s.room_no = p_room_no
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
        DROP PROCEDURE IF EXISTS getAllScheduleOfASpecificRoomOfASpecificWeek;
        
        ');
    }
};
