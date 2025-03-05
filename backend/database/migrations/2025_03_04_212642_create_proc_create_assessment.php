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
            
            CREATE PROCEDURE CreateAssessment(
                IN p_assessment_weight DECIMAL(5,2),
                IN p_assessment_date DATE,
                IN p_assessment_type VARCHAR(50),
                IN p_semester VARCHAR(255),
                IN p_courseID INT
            )
            BEGIN
                INSERT INTO assessments (
                    assessment_weight, assessment_date, assessment_type, semester, courseID
                ) VALUES (
                    p_assessment_weight, p_assessment_date, p_assessment_type, p_semester, p_courseID
                );
            END


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
        DROP PROCEDURE IF EXISTS CreateAssessment;
        
        ');
    }
};
