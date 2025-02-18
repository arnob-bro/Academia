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
            CREATE PROCEDURE RegisterFaculty(
                IN Name VARCHAR(255),
                IN ProfilePhoto TEXT,
                IN Department VARCHAR(100),
                IN facultyID VARCHAR(15),
                IN rank VARCHAR(255),
                IN administrative_role VARCHAR(255),
                IN Password VARCHAR(60)
            )
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION 
                BEGIN
                    ROLLBACK;
                END;

                START TRANSACTION;

                -- Use parameters directly without @
                INSERT INTO faculties (facultyID, name, profile_photo, department, rank, administrative_role)
                VALUES (facultyID, Name, ProfilePhoto, Department, rank, administrative_role);

                INSERT INTO users (userID, password, role)
                VALUES (facultyID, Password, "faculty");

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
        DB::unprepared('DROP PROCEDURE IF EXISTS RegisterFaculty');
    }
};
