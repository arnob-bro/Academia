<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        
        DB::statement('
            CREATE TABLE assessments (
                assessmentID INT AUTO_INCREMENT PRIMARY KEY ,
                assessment_weight DECIMAL(5,2) NOT NULL,
                assessment_date DATE NOT NULL,
                assessment_type VARCHAR(50) NOT NULL,
                semester VARCHAR(255) NOT NULL,
                courseID INT NOT NULL,
                FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE
);
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP TABLE IF EXISTS assessments');
        
    }
};
