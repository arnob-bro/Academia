<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
class AuthService
{
    public function Login($userID, $enteredPassword)
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
            $user = User::where("userID", $userID)->first();
            if (!$user) {
                return ['Status'=> 'no user found'];
            }
            else{
                $password = $user->password;
                if (Hash::check($enteredPassword, $user->password)) {
                return [
                    'userId' => $user->userID,
                    'role' => $user->role
                ];
            } 
            else{
                return ['Status'=> 'Wrong Password'];
            }
            }
        }catch(\Exception $e){
            $data = ['error'=> $e];

        return $data;
        }
        
        
    }
}