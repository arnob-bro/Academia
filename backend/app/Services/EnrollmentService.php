<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
class EnrollmentService
{
    public function enrollInCourse($studentID, $courseID, $enrollment_semester)
    {
        try{

            $enrollmentDate = Carbon::today()->toDateString();

            DB::statement("CALL enrollInCourse(?, ?, ?, ?)", [
            $studentID, $courseID,$enrollmentDate, $enrollment_semester
        ]);

        return [
            'message' => 'enrollment in this course has been done',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'enrollment in this course failed!',
            'message' => $e->getMessage()
            ];
        }
    }


    public function fetchEnrolledCoursesOfAStudentOfASemester($studentID)
    {
        try{

            

            $data = DB::select("CALL fetchEnrolledCoursesOfAStudentOfASemester(?)", [
            $studentID
        ]);

        return [
            $data
            ];

        }catch(\Exception $e){
            return [
            'error' => 'enrollment courses fetch failed!',
            'message' => $e->getMessage()
            ];
        }
    }
}