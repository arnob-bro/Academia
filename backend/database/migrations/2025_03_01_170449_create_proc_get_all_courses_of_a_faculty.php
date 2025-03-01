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
            CREATE PROCEDURE getAllCoursesOfAFaculty(
                IN p_facultyID VARCHAR(15)
            )
            BEGIN
                SELECT * 
                FROM courses
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
        DROP PROCEDURE IF EXISTS getAllCoursesOfAFaculty;
        
        ');
    }
};
