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
         // Retrieve current day and week from variables
        $currentDayQuery = DB::select("SELECT current_day_of_week FROM variables WHERE log_id = 1");
        if (empty($currentDayQuery)) {
            return ['error' => 'Current day information not found'];
        }
        $currentDay = $currentDayQuery[0]->current_day_of_week;

        $currentWeekQuery = DB::select("SELECT current_week_no FROM variables WHERE log_id = 1");
        if (empty($currentWeekQuery)) {
            return ['error' => 'Current week information not found'];
        }
        $currentWeek = $currentWeekQuery[0]->current_week_no;

        // Fetch scheduleID for the given course, day, and week
        $isScheduled = DB::select("
            SELECT scheduleID FROM schedules
            WHERE courseID = ? AND day_of_week = ? AND week_no = ?
        ", [$courseID, $currentDay, $currentWeek]);

        // If the course is scheduled today, return an error
        if (empty($isScheduled)) {
            return ['error' => 'Students cannot be fetched as the course is not scheduled today.'];
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


   public function postAttendanceStatusOfStudents($attendance_date, $courseID, $studentID, $status)
{
    try {
        // Retrieve current day and week from variables
        $currentDayQuery = DB::select("SELECT current_day_of_week FROM variables WHERE log_id = 1");
        if (empty($currentDayQuery)) {
            return ['error' => 'Current day information not found'];
        }
        $currentDay = $currentDayQuery[0]->current_day_of_week;

        $currentWeekQuery = DB::select("SELECT current_week_no FROM variables WHERE log_id = 1");
        if (empty($currentWeekQuery)) {
            return ['error' => 'Current week information not found'];
        }
        $currentWeek = $currentWeekQuery[0]->current_week_no;

        // Fetch scheduleID for the given course, day, and week
        $scheduleResults = DB::select("
            SELECT scheduleID FROM schedules
            WHERE courseID = ? AND day_of_week = ? AND week_no = ?
        ", [$courseID, $currentDay, $currentWeek]);

        if (empty($scheduleResults)) {
            return ['error' => 'No schedule found for the current day and week'];
        }
        $scheduleID = $scheduleResults[0]->scheduleID;

        // Call stored procedure with correct parameters
        DB::statement("CALL postAttendanceStatusOfStudents(?, ?, ?, ?)", [
            $attendance_date,
            $scheduleID,
            $studentID,
            $status
        ]);

        return ['message' => 'attendance post successful'];

    } catch (\Exception $e) {
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