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
            CREATE PROCEDURE postAttendanceStatusOfStudents(
                IN p_attendance_date DATE,
                IN p_scheduleID INT,
                IN p_studentID VARCHAR(15),
                IN p_status ENUM("Present", "Absent", "Late", "Excused")
            )
            BEGIN
                INSERT INTO attendances (attendance_date, scheduleID, studentID, status)
                VALUES (p_attendance_date, p_scheduleID, p_studentID, p_status)
                ON DUPLICATE KEY UPDATE status = p_status;
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
        DROP PROCEDURE IF EXISTS postAttendanceStatusOfStudents;
        
        ');
    }
};
