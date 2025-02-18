<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('students', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });
        DB::statement('
            CREATE TABLE students (
                studentID VARCHAR(15) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                profile_photo TEXT,
                department VARCHAR(100) NOT NULL,
                current_semester VARCHAR(255) NOT NULL,
                enrollment_semester VARCHAR(255) NOT NULL
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
        // Schema::dropIfExists('students');
        DB::statement('DROP TABLE IF EXISTS students');
    }
};
