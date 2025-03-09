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
            CREATE TABLE faculty_leaves (
                leave_id INT AUTO_INCREMENT PRIMARY KEY,
                facultyID VARCHAR(15) NOT NULL,
                leave_type ENUM(\'Sick Leave\', \'Annual Leave\', \'Maternity Leave\', \'Other\') NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                total_days INT GENERATED ALWAYS AS (DATEDIFF(end_date, start_date) + 1) VIRTUAL,
                leave_status ENUM(\'Pending\', \'Approved\', \'Rejected\') DEFAULT \'Pending\',
                remarks TEXT NULL,
                FOREIGN KEY (facultyID) REFERENCES faculties(facultyID) ON DELETE CASCADE
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
        DB::statement('DROP TABLE IF EXISTS faculty_leaves');
    }
};
