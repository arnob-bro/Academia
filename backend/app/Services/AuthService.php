<?php

namespace App\Services;

use Illuminate\Http\Request;
class AuthService
{
    public function Login($id, $password)
    {
        
        if($id=="20220104064" && $password=="123456")
        {
            $Name = "Abdul Mohaimen Khan Arnob";
            $Department = "Computer Science and Engineering";
            $CurrentSemester = 7;
            $EnrollmentSemester = "Spring 2022";
            $data = [
                'Name' => $Name,
                'Department' => $Department,
                'CurrentSemester' => $CurrentSemester,
                'EnrollmentSemester' => $EnrollmentSemester,
                'Role'=> 'student'
                
            ];
            return $data;
        }
        else if($id=="CSE2022010" && $password=="123456")
        {
            $Name = "Mr. X";
            $Department = "Computer Science and Engineering";
            $Rank = "Professor";
            $Administrative_Role = "Exam Controller";
            $data = [
                'Name' => $Name,
                'Department' => $Department,
                'Rank' => $Rank,
                'Role'=> 'faculty',
                'Administrative_Role' => $Administrative_Role
            ];
            return $data;
        }
        else if($id=="admin" && $password=="123456")
        {
            $Name = "Mr. Admin";
            $Administrative_Role = "Developer";
            $data = [
                'Name' => $Name,
                'Role'=> 'admin',
                'Administrative_Role' => $Administrative_Role,
            ];
            return $data;
        }
        $data = [
        'Status' => 'failed'
        ];
        return $data;
        
    }
}