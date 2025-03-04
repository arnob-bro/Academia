<?php

namespace App\Http\Controllers;
use App\Services\ScheduleService;
use App\Services\LeaveApplicationService;
use App\Services\CourseService;
use App\Services\AttendanceService;
use DB;

use Illuminate\Http\Request;

class FacultyController extends Controller
{
    private $scheduleService;
    private $leaveApplicationService;
    private $courseService;
    private $attendanceService;

    public function __construct(ScheduleService $scheduleService, LeaveApplicationService $leaveApplicationService, CourseService $courseService, AttendanceService $attendanceService)
    {
        $this->scheduleService = $scheduleService;
        $this->leaveApplicationService = $leaveApplicationService;
        $this->courseService = $courseService;
        $this->attendanceService = $attendanceService;

    }

    public function rescheduleClass(Request $request)
    {
        $data = $this->scheduleService->rescheduleClass($request->old_week_no, $request->old_day_of_week, $request->old_start_time, $request->facultyID, $request->new_week_no, $request->new_day_of_week, $request->new_start_time, $request->new_end_time, $request->new_room_no);

        return response()->json($data);
    }

    public function getAllScheduleOfASpecificRoomOfASpecificWeek(Request $request)
    {
        $schedules = $this->scheduleService->getAllScheduleOfASpecificRoomOfASpecificWeek($request->week_no , $request->room_no);

        return response()->json($schedules);
    }
    public function postLeaveApplicationRequest(Request $request)
    {
        $leave_request = $this->leaveApplicationService->postLeaveApplicationRequest($request->facultyID , $request->leave_type,$request->start_date,$request->end_date,$request->remarks );

        return response()->json($leave_request);
    }

    public function getAllLeaveApplicationRequestsOfAFaculty(Request $request)
    {
        $leave_request = $this->leaveApplicationService->getAllLeaveApplicationRequestsOfAFaculty($request->facultyID );

        return response()->json($leave_request);
    }

    public function getAllCoursesOfAFaculty(Request $request)
    {
        $courses = $this->courseService->getAllCoursesOfAFaculty($request->facultyID );
    

        return response()->json($courses);
    }



    public function getAllStudentsOfACourseOfASemester(Request $request)
    {
        $students = $this->attendanceService->getAllStudentsOfACourseOfASemester($request->courseID);

        return response()->json($students);
    }

    public function postAttendanceStatusOfStudents(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            '*.attendance_date' => 'required|date',
            '*.scheduleID' => 'required|integer',
            '*.studentID' => 'required|string|max:15',
            '*.status' => 'required|in:Present,Absent,Late,Excused'
        ]);

        // Iterate over each object in the request
        foreach ($validatedData as $attendance) {
            $this->attendanceService->postAttendanceStatusOfStudents($attendance['attendance_date'],
                $attendance['scheduleID'],
                $attendance['studentID'],
                $attendance['status']);
        }
        return response()->json(['message' => 'attendance post successful'],200);

    }

     public function getAllWeeksForAttendanceHistory(Request $request)
    {
        $weeks = $this->attendanceService->getAllWeeksForAttendanceHistory($request->courseID);

        return response()->json($weeks);
    }
}
