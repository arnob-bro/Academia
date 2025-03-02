<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class AttendanceService
{
    public function getAllStudentsOfACourseOfASemester($courseID)
    {
        try{

            

            $data= DB::select("CALL getAllStudentsOfACourseOfASemester(?)", [
            $courseID
        ]);

        return [
            $data
            ];

        }catch(\Exception $e){
            return [
            'error' => 'all student fetch failed!',
            'message' => $e->getMessage()
            ];
        }
    }

    public function postAttendanceStatusOfStudents($attendance_date,$scheduleID,$studentID, $status )
    {
        try{

            

            $data= DB::select("CALL postAttendanceStatusOfStudents(?, ?, ?, ?)", [
            $attendance_date,$scheduleID,$studentID, $status
        ]);

        return [
            'message' => 'attendance post successful'
            ];

        }catch(\Exception $e){
            return [
            'error' => 'attendance post failed!',
            'message' => $e->getMessage()
            ];
        }
    }

    public function getAllWeeksForAttendanceHistory($courseID)
    {
        try{

            $data= DB::select("CALL getAllWeeksForAttendanceHistory(?)", [
            $courseID
        ]);

        return [
            $data
            ];

        }catch(\Exception $e){
            return [
            'error' => 'fetch AllWeeksForAttendanceHistory failed!',
            'message' => $e->getMessage()
            ];
        }
    }
}