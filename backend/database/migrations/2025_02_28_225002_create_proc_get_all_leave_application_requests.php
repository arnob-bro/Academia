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
            CREATE PROCEDURE getAllLeaveApplicationRequests()
            BEGIN
                -- Retrieve all leave requests
                SELECT leave_id, facultyID, leave_type, start_date, end_date, total_days, leave_status, remarks
                FROM faculty_leaves;
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
        DROP PROCEDURE IF EXISTS getAllLeaveApplicationRequests;
        
        ');
    }
};
