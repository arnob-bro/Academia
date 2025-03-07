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

        return $schedules;

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

        return $schedules;

        }catch(\Exception $e){
            return [
            'error' => 'students weekly schedule fetching failed!',
            'message' => $e->getMessage(),
            ];
        }
    }


    public function getDailyScheduleOfAStudent($p_studentID)
    {
        try{
            $currentWeekQuery = DB::select("SELECT current_week_no FROM variables WHERE log_id = 1");
            if (empty($currentWeekQuery)) {
                return ['error' => 'Current day information not found'];
            }
            $current_week_no = $currentWeekQuery[0]->current_week_no;
            
            $currentDayQuery = DB::select("SELECT current_day_of_week FROM variables WHERE log_id = 1");
            if (empty($currentDayQuery)) {
                return ['error' => 'Current day information not found'];
            }
            $currentDay = $currentDayQuery[0]->current_day_of_week;

            $schedules = DB::select("CALL getDailyScheduleOfAStudent(?, ?, ?)", [
                $p_studentID,$current_week_no, $currentDay
        ]);

        return $schedules;

        }catch(\Exception $e){
            return [
            'error' => 'students daily schedule fetching failed!',
            'message' => $e->getMessage(),
            ];
        }
    }


    public function getDailyScheduleOfAFaculty($facultyID)
    {
        try {
            // Fetch current week and day in a single query
            $currentInfoQuery = DB::select("SELECT current_week_no, current_day_of_week FROM variables WHERE log_id = 1");
            
            if (empty($currentInfoQuery)) {
                return ['error' => 'Current week and day information not found'];
            }

            $current_week_no = $currentInfoQuery[0]->current_week_no;
            $current_day = $currentInfoQuery[0]->current_day_of_week;

            $query = "
                SELECT DISTINCT 
                    s.scheduleID,
                    s.day_of_week,
                    s.start_time,
                    s.end_time,
                    s.room_no,
                    s.facultyID,
                    f.name AS faculty_name,
                    c.courseID,
                    c.course_code,
                    c.course_name
                FROM schedules s
                JOIN courses c ON s.courseID = c.courseID
                JOIN faculties f ON s.facultyID = f.facultyID
                WHERE s.facultyID = ?
                AND s.week_no = ?
                AND s.day_of_week = ?
                ORDER BY s.start_time;
            ";

            $schedules = DB::select($query, [$facultyID, $current_week_no, $current_day]);

            return $schedules;
            
        } catch (\Exception $e) {
            return [
                'error' => "Faculty's daily schedule fetching failed!",
                'message' => $e->getMessage(),
            ];
        }
    }


}