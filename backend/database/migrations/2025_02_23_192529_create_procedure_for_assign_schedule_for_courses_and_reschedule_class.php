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
            CREATE PROCEDURE assignScheduleForCourses(
                IN p_week_no INT,
                IN p_day_of_week VARCHAR(20),
                IN p_start_time TIME,
                IN p_end_time TIME,
                IN p_room_no VARCHAR(50),
                IN p_facultyID VARCHAR(15),
                IN p_courseID INT
            )
            BEGIN
                -- Check for overlapping schedules for the same faculty and room
                IF EXISTS (
                    SELECT 1 FROM schedules
                    WHERE facultyID = p_facultyID
                    AND week_no = p_week_no
                    AND day_of_week = p_day_of_week
                    AND (
                        (p_start_time >= start_time AND p_start_time < end_time) OR
                        (p_end_time > start_time AND p_end_time <= end_time) OR
                        (p_start_time <= start_time AND p_end_time >= end_time)
                    )
                ) THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Schedule conflict for faculty";
                END IF;
                
                IF EXISTS (
                    SELECT 1 FROM schedules
                    WHERE room_no = p_room_no
                    AND week_no = p_week_no
                    AND day_of_week = p_day_of_week
                    AND (
                        (p_start_time >= start_time AND p_start_time < end_time) OR
                        (p_end_time > start_time AND p_end_time <= end_time) OR
                        (p_start_time <= start_time AND p_end_time >= end_time)
                    )
                ) THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Schedule conflict for room";
                END IF;
                
                -- Insert the schedule if no conflicts are found
                INSERT INTO schedules (week_no, day_of_week, start_time, end_time, room_no, facultyID, courseID)
                VALUES (p_week_no, p_day_of_week, p_start_time, p_end_time, p_room_no, p_facultyID, p_courseID);
            END;


            CREATE PROCEDURE rescheduleClass(
                IN p_old_week_no INT,
                IN p_old_day_of_week VARCHAR(20),
                IN p_old_start_time TIME,
                IN p_facultyID VARCHAR(15),
                IN p_new_week_no INT,
                IN p_new_day_of_week VARCHAR(20),
                IN p_new_start_time TIME,
                IN p_new_end_time TIME,
                IN p_new_room_no VARCHAR(50)
            )
            BEGIN
                DECLARE v_courseID INT;
                
                -- Find the course ID for the existing schedule
                SELECT courseID INTO v_courseID FROM schedules
                WHERE week_no = p_old_week_no
                AND day_of_week = p_old_day_of_week
                AND start_time = p_old_start_time
                AND facultyID = p_facultyID
                LIMIT 1;
                
                IF v_courseID IS NULL THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "No matching schedule found";
                END IF;
                
                -- Delete the old schedule
                DELETE FROM schedules
                WHERE week_no = p_old_week_no
                AND day_of_week = p_old_day_of_week
                AND start_time = p_old_start_time
                AND facultyID = p_facultyID;
                
                -- Insert the new schedule
                CALL assignScheduleForCourses(p_new_week_no, p_new_day_of_week, p_new_start_time, p_new_end_time, p_new_room_no, p_facultyID, v_courseID);
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
        DROP PROCEDURE IF EXISTS rescheduleClass;
        DROP PROCEDURE IF EXISTS assignScheduleForCourses;
        ');
    }
};
