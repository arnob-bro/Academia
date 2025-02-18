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
            CREATE PROCEDURE RegisterStudent(
                IN Name VARCHAR(255),
                IN ProfilePhoto TEXT,
                IN Department VARCHAR(100),
                IN studentID VARCHAR(15),
                IN CurrentSemester VARCHAR(255),
                IN EnrollmentSemester VARCHAR(255),
                IN Password VARCHAR(60)
            )
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION 
                BEGIN
                    ROLLBACK;
                END;

                START TRANSACTION;

                -- Use parameters directly without @
                INSERT INTO students (studentID, name, profile_photo, department, current_semester, enrollment_semester)
                VALUES (studentID, Name, ProfilePhoto, Department, CurrentSemester, EnrollmentSemester);

                INSERT INTO users (userID, password, role)
                VALUES (studentID, Password, "student");

                COMMIT;
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
        DB::unprepared('DROP PROCEDURE IF EXISTS RegisterStudent');
    }
};
