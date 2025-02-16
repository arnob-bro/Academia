<?php

namespace App\Services;

use Illuminate\Http\Request;
class AuthService
{
    public function Login(Request $req)
    {
        $Id = $req->input('Id');
        $Password = $req->input('Password');
        if($Id=="20220104064" && $Password=="123456")
        {
            $Name = "Abdul Mohaimen Khan Arnob";
            $Department = "Computer Science and Engineering";
            $CurrentSemester = 7;
            $EnrollmentSemester = "Spring 2022";
            return response()->json([
                'Name' => $Name,
                'Department' => $Department,
                'CurrentSemester' => $CurrentSemester,
                'EnrollmentSemester' => $EnrollmentSemester,
                'Role'=> 'student'
                
]);
        }
        else if($Id=="CSE2022010" && $Password=="123456")
        {
            $Name = "Mr. X";
            $Department = "Computer Science and Engineering";
            $Rank = "Professor";
            $Administrative_Role = "Exam Controller";
            return response()->json([
                'Name' => $Name,
                'Department' => $Department,
                'Rank' => $Rank,
                'Role'=> 'faculty',
                'Administrative_Role' => $Administrative_Role,
]);
        }
        else if($Id=="admin" && $Password=="123456")
        {
            $Name = "Mr. Admin";
            $Administrative_Role = "Developer";
            return response()->json([
                'Name' => $Name,
                'Role'=> 'admin',
                'Administrative_Role' => $Administrative_Role,
]);
        }
        return response()->json([
        'Status' => 'failed'
]);
        
    }
}