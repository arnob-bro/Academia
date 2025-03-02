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
            CREATE PROCEDURE updateAttendanceStatusOfStudents(
                IN p_attendanceID INT,
                IN p_status ENUM("Present", "Absent", "Late", "Excused")
            )
            BEGIN
                UPDATE attendances
                SET status = p_status
                WHERE attendanceID = p_attendanceID;
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
        DROP PROCEDURE IF EXISTS updateAttendanceStatusOfStudents;
        
        ');
    }
};
