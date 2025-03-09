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
            CREATE PROCEDURE getAllLeaveApplicationRequestsOfAFaculty(
                IN p_facultyID VARCHAR(15)
            )
            BEGIN
                -- Retrieve all leave requests for a specific faculty member
                SELECT leave_id, leave_type, start_date, end_date, total_days, leave_status, remarks
                FROM faculty_leaves
                WHERE facultyID = p_facultyID;
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
        DROP PROCEDURE IF EXISTS getAllLeaveApplicationRequestsOfAFaculty;
        
        ');
    }
};
