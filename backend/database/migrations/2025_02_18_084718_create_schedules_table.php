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
            CREATE TABLE schedules (
                scheduleID INT AUTO_INCREMENT PRIMARY KEY,
                week_no INT NOT NULL,
                day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")),
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                room_no VARCHAR(50),
                facultyID VARCHAR(15) NOT NULL,
                courseID INT NOT NULL,
                FOREIGN KEY (facultyID) REFERENCES faculties(facultyID) ON DELETE CASCADE,
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
        DB::statement('DROP TABLE IF EXISTS schedules');
    }
};
