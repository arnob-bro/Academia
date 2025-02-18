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
            CREATE TABLE performances (
                performanceID INT AUTO_INCREMENT PRIMARY KEY,
                score DECIMAL(5,2) NOT NULL,
                max_score DECIMAL(5,2) NOT NULL,
                feedback TEXT,
                assessmentID INT NOT NULL,
                enrollmentID INT NOT NULL,
                FOREIGN KEY (assessmentID) REFERENCES assessments(assessmentID),
                FOREIGN KEY (enrollmentID) REFERENCES enrollments(enrollmentID) 
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
        DB::statement('DROP TABLE IF EXISTS performances');
        
    }
};
