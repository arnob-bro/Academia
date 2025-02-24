<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class ScheduleService
{
    public function assignScheduleForCourses($week_no, $day_of_week, $start_time, $end_time, $room_no, $facultyID, $courseID)
    {
        try{
            DB::statement("CALL assignScheduleForCourses(?, ?, ?, ?, ?, ?, ?)", [
                $week_no,$day_of_week, $start_time, $end_time, $room_no, $facultyID, $courseID
        ]);

        return [
            'message' => 'schedule has been created',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'Schedule creation failed!',
            'message' => $e->getMessage(),
            ];
        }
    }


    public function rescheduleClass($old_week_no, $old_day_of_week, $old_start_time, $facultyID,$new_week_no, $new_day_of_week, $new_start_time,$new_end_time,  $_new_room_no)
    {
        try{
            DB::statement("CALL rescheduleClass(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                $old_week_no, $old_day_of_week, $old_start_time, $facultyID,$new_week_no, $new_day_of_week, $new_start_time,$new_end_time,  $_new_room_no
        ]);

        return [
            'message' => 'class has been rescheduled',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'reschedule failed!',
            'message' => $e->getMessage(),
            ];
        }
    }


    public function getAllScheduleOfASpecificRoomOfASpecificWeek($p_week_no,$p_room_no )
    {
        try{
            $schedules = DB::select("CALL getAllScheduleOfASpecificRoomOfASpecificWeek(?, ?)", [
                $p_week_no, $p_room_no
        ]);

        return [
            $schedules
            ];

        }catch(\Exception $e){
            return [
            'error' => 'room schedule fetching failed!',
            'message' => $e->getMessage(),
            ];
        }
    }

    public function getScheduleOfAStudent($p_studentID,$p_week_no )
    {
        try{
            $schedules = DB::select("CALL getScheduleOfAStudent(?, ?)", [
                $p_studentID,$p_week_no
        ]);

        return [
            $schedules
            ];

        }catch(\Exception $e){
            return [
            'error' => 'students weekly schedule fetching failed!',
            'message' => $e->getMessage(),
            ];
        }
    }
}