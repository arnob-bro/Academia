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
            CREATE TABLE variables (
                log_id INT PRIMARY KEY ,
                current_semester VARCHAR(255),
                semester_starting_date DATE,
                current_week_no INT,
                current_day_of_week VARCHAR(20) NOT NULL CHECK (current_day_of_week IN ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")),
                advising BOOLEAN DEFAULT FALSE
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
        DB::statement('DROP TABLE IF EXISTS variables');
    }
};
