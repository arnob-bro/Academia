<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;

class CourseService 
{
    public function createNewCourse($course_code, $course_name, $department, $description, $credit, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code)
    {
        try{
            DB::statement("CALL CreateNewCourse(?, ?, ?, ?, ?, ?, ?)", [
            $course_code, $course_name, $department, $description, $credit, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code
        ]);

        return [
            'message' => 'New course has been created',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'Course creation failed!',
            'message' => $e->getMessage()
            ];
        }
    }

    public function editAnExistingCourse($course_code, $course_name, $department, $description, $credit, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code)
    {
        try{
            DB::statement("CALL EditAnExistingCourse(?, ?, ?, ?, ?, ?, ?)", [
            $course_code, $course_name, $department, $description, $credit, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code
        ]);

        return [
            'message' => 'Course has been edited',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'Course edition failed!',
            'message' => $e->getMessage()
            ];
        }
    }
}