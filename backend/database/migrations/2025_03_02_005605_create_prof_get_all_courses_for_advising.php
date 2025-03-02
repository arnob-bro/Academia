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
            CREATE PROCEDURE getAllCoursesForAdvising()
            BEGIN
                SELECT 
                    c.courseID,
                    c.course_code,
                    c.course_name,
                    c.department,
                    c.description,
                    c.credits,
                    c.section,
                    c.number_of_vacant_seats,
                    c.facultyID,
                    c.prerequisite_course_code,

                    -- First schedule
                    s1.day_of_week AS schedule_day_1,
                    TIME_FORMAT(s1.start_time, "%H:%i") AS start_time_day_1,
                    TIME_FORMAT(s1.end_time, "%H:%i") AS end_time_day_1,

                    -- Second schedule
                    s2.day_of_week AS schedule_day_2,
                    TIME_FORMAT(s2.start_time, "%H:%i") AS start_time_day_2,
                    TIME_FORMAT(s2.end_time, "%H:%i") AS end_time_day_2

                FROM courses c
                LEFT JOIN schedules s1 ON c.courseID = s1.courseID
                LEFT JOIN schedules s2 ON c.courseID = s2.courseID AND s1.scheduleID < s2.scheduleID
                WHERE s1.scheduleID IS NOT NULL AND s2.scheduleID IS NOT NULL AND s1.week_no=1 AND s2.week_no=1;
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
        DROP PROCEDURE IF EXISTS getAllCoursesForAdvising;
        
        ');
    }
};
