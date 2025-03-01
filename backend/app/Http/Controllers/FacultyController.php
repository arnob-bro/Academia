<?php

namespace App\Http\Controllers;
use App\Services\ScheduleService;
use App\Services\LeaveApplicationService;

use Illuminate\Http\Request;

class FacultyController extends Controller
{
    private $scheduleService;
    private $leaveApplicationService;

    public function __construct(ScheduleService $scheduleService, LeaveApplicationService $leaveApplicationService)
    {
        $this->scheduleService = $scheduleService;
        $this->leaveApplicationService = $leaveApplicationService;

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
}
