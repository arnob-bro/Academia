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
            CREATE PROCEDURE reviewALeaveApplicationRequest(
                IN p_leave_id INT,
                IN p_leave_status ENUM("Approved", "Rejected")
            )
            BEGIN
                -- Update the leave request status and remarks by admin
                UPDATE faculty_leaves
                SET leave_status = p_leave_status
                WHERE leave_id = p_leave_id;
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
        DROP PROCEDURE IF EXISTS reviewALeaveApplicationRequest;
        
        ');
    }
};
