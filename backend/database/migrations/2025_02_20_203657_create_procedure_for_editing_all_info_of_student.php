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
            CREATE PROCEDURE editAllInformationOfStudent(
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
                IN personal_email VARCHAR(255)
            )
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION 
                BEGIN
                    ROLLBACK;
                END;

                START TRANSACTION;

                UPDATE personal_information_of_students
                SET first_name = first_name,
                    last_name = last_name,
                    father_name = father_name,
                    mother_name = mother_name,
                    birth_date = birth_date,
                    nid = nid,
                    birth_registration_No = birth_registration_No,
                    gender = gender,
                    religion = religion,
                    blood_group = blood_group
                WHERE studentID = studentID;

                UPDATE present_address_of_students
                SET road_house_flat_no = road_house_flat_no,
                    country = country,
                    division = division,
                    district = district,
                    thana = thana
                WHERE studentID = studentID;

                UPDATE permanent_address_of_students
                SET road_house_flat_no = road_house_flat_no_permanent,
                    country = country_permanent,
                    division = division_permanent,
                    district = district_permanent,
                    thana = thana_permanent
                WHERE studentID = studentID;

                UPDATE guardian_information_of_students
                SET guardian_name = guardian_name,
                    guardian_mobile = guardian_mobile,
                    guardian_email = guardian_email
                WHERE studentID = studentID;

                UPDATE contact_details_of_students
                SET mobile_number = mobile_number,
                    phone_number = phone_number,
                    personal_email = personal_email
                WHERE studentID = studentID;

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
        DB::unprepared('DROP PROCEDURE IF EXISTS editAllInformationOfStudent');
    }
};
