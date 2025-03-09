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
                DECLARE v_existing_leaves INT;
                
                -- Calculate total days of leave requested
                SET v_total_days = DATEDIFF(p_end_date, p_start_date) + 1;
                
                -- Get total leave taken by the faculty in the current year
                SELECT COALESCE(SUM(total_days), 0) INTO v_existing_leaves
                FROM faculty_leaves
                WHERE facultyID = p_facultyID AND YEAR(start_date) = YEAR(CURDATE());
                
                -- Check if the total leave exceeds 14 days
                IF (v_existing_leaves + v_total_days) > 14 THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Leave request exceeds the 14-day annual limit";
                ELSE
                    -- Insert the leave request into the table
                    INSERT INTO faculty_leaves (facultyID, leave_type, start_date, end_date, leave_status, remarks)
                    VALUES (p_facultyID, p_leave_type, p_start_date, p_end_date, "Pending", p_remarks);
                END IF;
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
