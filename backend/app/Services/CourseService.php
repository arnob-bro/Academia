<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;

class CourseService 
{
    public function createNewCourse($course_code, $course_name, $department, $description, $credits, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code)
    {
        try{
            DB::statement("CALL CreateNewCourse(?, ?, ?, ?, ?, ?, ?,?,?)", [
            $course_code, $course_name, $department, $description, $credits, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code
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

    public function editAnExistingCourse($course_code, $course_name, $department, $description, $credits, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code)
    {
        try{
            DB::statement("CALL EditAnExistingCourse(?, ?, ?, ?, ?, ?, ?,?,?)", [
            $course_code, $course_name, $department, $description, $credits, $section, $facultyID, $number_of_vacant_seats, $prerequisite_course_code
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

    public function getAllCoursesOfAFaculty( $facultyID)
    {
        try{
            $data = DB::select("CALL getAllCoursesOfAFaculty(?)", [
            $facultyID
        ]);

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'Course fetching of a faculty failed',
            'message' => $e->getMessage()
            ];
        }
    }

    public function getAllCourses()
    {
        try{
            $data = DB::select("CALL getAllCourses()",);

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'Course fetching failed',
            'message' => $e->getMessage()
            ];
        }
    }


    public function getAllCoursesForAdvising()
    {
        try{
            $data = DB::select("CALL getAllCoursesForAdvising()",);

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'Course fetching failed',
            'message' => $e->getMessage()
            ];
        }
    }


    public function getAllCoursesSchedule()
    {
        try{
            $query = "
                SELECT 
                    c.courseID,
                    c.course_code,
                    c.course_name,
                    c.department,
                    c.description,
                    c.credits,
                    c.section,
                    c.number_of_vacant_seats,
                    c.facultyID,
                    c.prerequisite_course_code,

                    -- First schedule
                    s1.day_of_week AS schedule_day_1,
                    TIME_FORMAT(s1.start_time, '%H:%i') AS start_time_day_1,
                    TIME_FORMAT(s1.end_time, '%H:%i') AS end_time_day_1,

                    -- Second schedule
                    s2.day_of_week AS schedule_day_2,
                    TIME_FORMAT(s2.start_time, '%H:%i') AS start_time_day_2,
                    TIME_FORMAT(s2.end_time, '%H:%i') AS end_time_day_2

                FROM courses c
                LEFT JOIN schedules s1 ON c.courseID = s1.courseID
                LEFT JOIN schedules s2 ON c.courseID = s2.courseID AND s1.scheduleID < s2.scheduleID
                WHERE s1.scheduleID IS NOT NULL AND s2.scheduleID IS NOT NULL AND s1.week_no=1 AND s2.week_no=1;

            ";
            $data = DB::select($query);

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'Course fetching failed',
            'message' => $e->getMessage()
            ];
        }
    }
}