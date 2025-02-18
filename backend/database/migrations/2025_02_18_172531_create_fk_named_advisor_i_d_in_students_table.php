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
        DB::statement('
            ALTER TABLE students 
            ADD COLUMN advisorID VARCHAR(15) NULL,
            ADD CONSTRAINT fk_advisor FOREIGN KEY (advisorID) REFERENCES faculties(facultyID) ON DELETE SET NULL;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('
            ALTER TABLE students 
            DROP FOREIGN KEY fk_advisor,
            DROP COLUMN advisorID;
        ');
    }
};
