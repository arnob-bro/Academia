<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class AttendanceService
{
    public function getAllStudentsOfACourseOfASemester($courseID)
{
    try {
        // Get the current day of the week from the variables table
        $currentDayQuery = DB::select("SELECT current_day_of_week FROM variables WHERE log_id = 1");
        
        if (empty($currentDayQuery)) {
            return ['error' => 'Current day information not found'];
        }

        $currentDay = $currentDayQuery[0]->current_day_of_week;

        // Check if the course is scheduled for today
        $isScheduled = DB::select("
            SELECT * FROM schedules
            WHERE courseID = ? AND day_of_week = ?
        ", [$courseID, $currentDay]);

        // If the course is scheduled today, return an error
        if (!empty($isScheduled)) {
            return ['error' => 'Students cannot be fetched as the course is scheduled today.'];
        }

        // Fetch students if the course is NOT scheduled today
        $data = DB::select("CALL getAllStudentsOfACourseOfASemester(?)", [$courseID]);

        return $data;
        
    } catch (\Exception $e) {
        return [
            'error' => 'All student fetch failed!',
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

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'fetch AllWeeksForAttendanceHistory failed!',
            'message' => $e->getMessage()
            ];
        }
    }
}