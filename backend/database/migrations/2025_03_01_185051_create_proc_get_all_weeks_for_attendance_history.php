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
            CREATE PROCEDURE getAllWeeksForAttendanceHistory(
                IN p_courseID INT
            )
            BEGIN
                SELECT DISTINCT s.week_no 
                FROM schedules s
                JOIN attendances a ON s.scheduleID = a.scheduleID
                WHERE s.courseID = p_courseID
                ORDER BY s.week_no;
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
        DROP PROCEDURE IF EXISTS getAllWeeksForAttendanceHistory;
        
        ');
    }
};
