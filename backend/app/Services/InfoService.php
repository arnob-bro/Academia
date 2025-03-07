<?php

namespace App\Services;

use App\Models\User;
use DB;
use \Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Hash;
class InfoService
{
       
    public function getStudentInfo($studentID)
    {
        try {
            $query = "
                SELECT
                    s.studentID,
                    s.name,
                    s.department,
                    s.institutional_email,
                    s.current_semester,
                    s.enrollment_semester,
                    
                    personal_info.first_name,
                    personal_info.last_name,
                    personal_info.father_name,
                    personal_info.mother_name,
                    personal_info.birth_date,
                    personal_info.nid,
                    personal_info.birth_registration_No,
                    personal_info.gender,
                    personal_info.religion,
                    personal_info.blood_group,
                    
                    pa.road_house_flat_no AS present_road,
                    pa.country AS present_country,
                    pa.division AS present_division,
                    pa.district AS present_district,
                    pa.thana AS present_thana,
                    
                    perm.road_house_flat_no AS permanent_road,
                    perm.country AS permanent_country,
                    perm.division AS permanent_division,
                    perm.district AS permanent_district,
                    perm.thana AS permanent_thana,
                    
                    g.guardian_name,
                    g.guardian_mobile,
                    g.guardian_email,
                    
                    c.mobile_number,
                    c.phone_number,
                    c.personal_email
                    
                FROM students AS s
                LEFT JOIN personal_information_of_students AS personal_info 
                    ON s.studentID = personal_info.studentID
                LEFT JOIN present_address_of_students AS pa 
                    ON s.studentID = pa.studentID
                LEFT JOIN permanent_address_of_students AS perm 
                    ON s.studentID = perm.studentID
                LEFT JOIN guardian_information_of_students AS g 
                    ON s.studentID = g.studentID
                LEFT JOIN contact_details_of_students AS c 
                    ON s.studentID = c.studentID
                WHERE s.studentID = ?
                LIMIT 1
            ";

            $studentInfo = DB::select($query, [$studentID]);

            if (empty($studentInfo)) {
            \Log::warning("No student data found for studentID: " . $studentID);
            return null;
        }
            return $studentInfo;
        } catch (\Exception $e) {
             \Log::error("SQL error fetching student info: " . $e->getMessage());
            return null;
        }
    }
            
        
}