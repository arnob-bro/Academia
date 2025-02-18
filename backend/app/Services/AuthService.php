<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class AuthService
{
    public function loginUser($userID, $enteredPassword)
    {
        
        // if($id=="20220104064" && $password=="123456")
        // {
        //     $Name = "Abdul Mohaimen Khan Arnob";
        //     $Department = "Computer Science and Engineering";
        //     $CurrentSemester = 7;
        //     $EnrollmentSemester = "Spring 2022";
        //     $data = [
        //         'Name' => $Name,
        //         'Department' => $Department,
        //         'CurrentSemester' => $CurrentSemester,
        //         'EnrollmentSemester' => $EnrollmentSemester,
        //         'Role'=> 'student'
                
        //     ];
        //     return $data;
        // }
        // else if($id=="CSE2022010" && $password=="123456")
        // {
        //     $Name = "Mr. X";
        //     $Department = "Computer Science and Engineering";
        //     $Rank = "Professor";
        //     $Administrative_Role = "Exam Controller";
        //     $data = [
        //         'Name' => $Name,
        //         'Department' => $Department,
        //         'Rank' => $Rank,
        //         'Role'=> 'faculty',
        //         'Administrative_Role' => $Administrative_Role
        //     ];
        //     return $data;
        // }
        // else if($id=="admin" && $password=="123456")
        // {
        //     $Name = "Mr. Admin";
        //     $Administrative_Role = "Developer";
        //     $data = [
        //         'Name' => $Name,
        //         'Role'=> 'admin',
        //         'Administrative_Role' => $Administrative_Role,
        //     ];
        //     return $data;
        // }
        // $data = [
        // 'Status' => 'failed'
        // ];
        
        try{
            // $user = User::where("userID", $userID)->first();
            $user = DB::select('select * from users where userID=?',[$userID]);
            
            if (empty($user)) {
                return ['status'=> 'no user found'];
            }
            $user = $user[0];
            $password = $user->password;
            if (Hash::check($enteredPassword, $password)) {
            return [
                'userID' => $user->userID,
                'role' => $user->role
            ];
            } 
            else{
                return ['status'=> 'Wrong Password'];
            }
            
        }catch(\Exception $e){
            $data = ['error'=> $e];

        return $data;
        }
        
        
    }


    public function registerStudent($name,$profile_photo,$department,$studentID,$currentSemester, $enrollmentSemester,$password) 
    {
         $profilePhotoPath = '';  

    try {
        

        // Call the stored procedure
        DB::statement("CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?)", [
            $name,
            $profile_photo,  
            $department,
            $studentID,
            $currentSemester,
            $enrollmentSemester,
            $password,
        ]);

        return [
            'message' => 'Student registered successfully!',
        ];
    } catch (\Exception $e) {
        return [
            'error' => 'Registration failed!',
            'message' => $e->getMessage(),
        ];
    }

    }

    public function registerFaculty($name,$profile_photo,$department,$facultyID,$rank, $administrative_role,$password) 
    {

    try {
        

        // Call the stored procedure
        DB::statement("CALL RegisterFaculty(?, ?, ?, ?, ?, ?, ?)", [
            $name,
            $profile_photo,  
            $department,
            $facultyID,
            $rank,
            $administrative_role,
            $password,
        ]);

        return [
            'message' => 'Faculty registered successfully!',
        ];
    } catch (\Exception $e) {
        return [
            'error' => 'Registration failed!',
            'message' => $e->getMessage(),
        ];
    }

    }
}