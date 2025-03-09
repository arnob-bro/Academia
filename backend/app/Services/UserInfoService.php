<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class UserInfoService
{
    public function storeAllInformationsOfStudent($studentID, $first_name, $last_name, $father_name, $mother_name, $birth_date, $nid, $birth_registration_No, $gender, $religion, $blood_group, $road_house_flat_no, $country, $division, $district, $thana, $road_house_flat_no_permanent, $country_permanent, $division_permanent, $district_permanent, $thana_permanent, $guardian_name, $guardian_mobile, $guardian_email, $mobile_number, $phone_number, $personal_email)
    {
        try{
            DB::statement("CALL StoreAllInformationsOfStudent(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)", [
            $studentID, $first_name, $last_name, $father_name, $mother_name, $birth_date, $nid, $birth_registration_No, $gender, $religion, $blood_group, $road_house_flat_no, $country, $division, $district, $thana, $road_house_flat_no_permanent, $country_permanent, $division_permanent, $district_permanent, $thana_permanent, $guardian_name, $guardian_mobile, $guardian_email, $mobile_number, $phone_number, $personal_email
        ]);

        return [
            'message' => 'All Informations Of Student store complete',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'Store failed!',
            'message' => $e->getMessage(),
            ];
        }
    }

    public function editAllInformationOfStudent($studentID, $first_name, $last_name, $father_name, $mother_name, $birth_date, $nid, $birth_registration_No, $gender, $religion, $blood_group, $road_house_flat_no, $country, $division, $district, $thana, $road_house_flat_no_permanent, $country_permanent, $division_permanent, $district_permanent, $thana_permanent, $guardian_name, $guardian_mobile, $guardian_email, $mobile_number, $phone_number, $personal_email)
    {
        try{
            DB::statement("CALL EditAllInformationOfStudent(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)", [
            $studentID, $first_name, $last_name, $father_name, $mother_name, $birth_date, $nid, $birth_registration_No, $gender, $religion, $blood_group, $road_house_flat_no, $country, $division, $district, $thana, $road_house_flat_no_permanent, $country_permanent, $division_permanent, $district_permanent, $thana_permanent, $guardian_name, $guardian_mobile, $guardian_email, $mobile_number, $phone_number, $personal_email
        ]);

        return [
            'message' => 'All Informations Of Student edit complete',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'edit failed!',
            'message' => $e->getMessage(),
            ];
        }
    }
}