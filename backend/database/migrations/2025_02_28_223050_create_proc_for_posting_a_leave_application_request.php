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
            CREATE PROCEDURE postLeaveApplicationRequest(
                IN p_facultyID VARCHAR(15),
                IN p_leave_type ENUM("Sick Leave", "Annual Leave", "Maternity Leave", "Other"),
                IN p_start_date DATE,
                IN p_end_date DATE,
                IN p_remarks TEXT
            )
            BEGIN
                DECLARE v_total_days INT;
                
                -- Calculate total days of leave
                SET v_total_days = DATEDIFF(p_end_date, p_start_date) + 1;
                
                -- Insert the leave request into the table
                INSERT INTO faculty_leaves (facultyID, leave_type, start_date, end_date, leave_status, remarks)
                VALUES (p_facultyID, p_leave_type, p_start_date, p_end_date, "Pending", p_remarks);
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
        DROP PROCEDURE IF EXISTS postLeaveApplicationRequest;
        
        ');
    }
};
