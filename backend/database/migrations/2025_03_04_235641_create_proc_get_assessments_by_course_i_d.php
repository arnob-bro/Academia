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
            CREATE PROCEDURE GetAssessmentsByCourseAndSemester(
            IN course_id_param INT,
            IN semester_param VARCHAR(255)
        )
        BEGIN
            SELECT 
                assessmentID,
                assessment_weight,
                assessment_date,
                assessment_type,
                semester,
                courseID
            FROM assessments
            WHERE 
                courseID = course_id_param 
                AND semester = semester_param
            ORDER BY assessment_date DESC;
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
        DROP PROCEDURE IF EXISTS GetAssessmentsByCourseAndSemester;
        
        ');
    }
};
