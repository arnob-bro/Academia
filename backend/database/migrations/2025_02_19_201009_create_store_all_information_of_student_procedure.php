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
            CREATE PROCEDURE StoreAllInformationsOfStudent(
                IN studentID VARCHAR(15),
                IN first_name VARCHAR(100),
                IN last_name VARCHAR(100),
                IN father_name VARCHAR(255),
                IN mother_name VARCHAR(255),
                IN birth_date DATE,
                IN nid VARCHAR(20),
                IN birth_registration_No VARCHAR(20),
                IN gender ENUM(\'Male\', \'Female\', \'Other\'),
                IN religion VARCHAR(50),
                IN blood_group VARCHAR(5),
                IN road_house_flat_no VARCHAR(255),
                IN country VARCHAR(100),
                IN division VARCHAR(100),
                IN district VARCHAR(100),
                IN thana VARCHAR(100),
                IN road_house_flat_no_permanent VARCHAR(255),
                IN country_permanent VARCHAR(100),
                IN division_permanent VARCHAR(100),
                IN district_permanent VARCHAR(100),
                IN thana_permanent VARCHAR(100),
                IN guardian_name VARCHAR(255),
                IN guardian_mobile VARCHAR(20),
                IN guardian_email VARCHAR(255),
                IN mobile_number VARCHAR(20),
                IN phone_number VARCHAR(20),
                IN personal_email VARCHAR(255),
                IN institutional_email VARCHAR(255)

            )
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION 
                BEGIN
                    ROLLBACK;
                END;

                START TRANSACTION;

                INSERT INTO personal_information_of_students(studentID, first_name, last_name, father_name, mother_name, birth_date, nid, birth_registration_No, gender, religion, blood_group)
                VALUES (studentID, first_name, last_name, father_name, mother_name, birth_date, nid, birth_registration_No, gender, religion, blood_group);

                INSERT INTO present_address_of_students(studentID, road_house_flat_no, country, division, district, thana)
                VALUES (studentID, road_house_flat_no, country, division, district, thana);

                INSERT INTO permanent_address_of_students(studentID, road_house_flat_no, country, division, district, thana)
                VALUES (studentID, road_house_flat_no_permanent, country_permanent, division_permanent, district_permanent, thana_permanent);

                INSERT INTO guardian_information_of_students(studentID, guardian_name, guardian_mobile, guardian_email)
                VALUES (studentID, guardian_name, guardian_mobile, guardian_email);

                INSERT INTO contact_details_of_students(studentID, mobile_number, phone_number, personal_email, institutional_email)
                VALUES (studentID, mobile_number, phone_number, personal_email, institutional_email);


                COMMIT;
            END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS StoreAllInformationsOfStudent');
    }
};
