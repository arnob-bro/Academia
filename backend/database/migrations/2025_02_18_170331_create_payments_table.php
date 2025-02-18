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
            CREATE TABLE payments (
                paymentID INT AUTO_INCREMENT PRIMARY KEY,
                studentID VARCHAR(15) NOT NULL,
                semester VARCHAR(255) NOT NULL,
                amount_paid DECIMAL(10,2) NOT NULL,
                total_fee DECIMAL(10,2) NOT NULL,
                payment_date DATE NOT NULL,
                payment_status VARCHAR(20) DEFAULT "Pending" CHECK (payment_status IN ("Pending","Failed","Completed")),
                payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ("Bank Transfer", "Credit Card", "Cash", "Online")),
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
        DB::statement('DROP TABLE IF EXISTS payments');
        
    }
};
