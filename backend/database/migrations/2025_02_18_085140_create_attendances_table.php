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
            CREATE TABLE attendances (
                attendanceID INT AUTO_INCREMENT PRIMARY KEY,
                attendance_date DATE NOT NULL,
                status ENUM("Present", "Absent", "Late", "Excused") NOT NULL,
                scheduleID INT NOT NULL,
                studentID VARCHAR(15) NOT NULL,
                FOREIGN KEY (scheduleID) REFERENCES schedules(scheduleID) ON DELETE CASCADE,
                FOREIGN KEY (studentID) REFERENCES students(studentID) ON DELETE CASCADE
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
        DB::statement('DROP TABLE IF EXISTS attendances');
    }
};
