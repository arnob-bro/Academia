<?php

namespace App\Http\Controllers;
use App\Services\CourseService;
use App\Services\ScheduleService;
use App\Services\LeaveApplicationService;
use App\Services\VariableService;

use Illuminate\Http\Request;

class AdminController extends Controller
{


    private $courseService;
    private $variableService;
    private $scheduleService;
    private $leaveApplicationService;

    public function __construct(CourseService $courseService , ScheduleService $scheduleService, LeaveApplicationService $leaveApplicationService, VariableService $variableService)
    {
        $this->courseService = $courseService;
        $this->scheduleService = $scheduleService;
        $this->leaveApplicationService = $leaveApplicationService;
        $this->variableService = $variableService;

    }

    public function createNewCourse(Request $request)
    {
        $data = $this->courseService->createNewCourse($request->course_code, $request->course_name, $request->department, $request->description, $request->credit, $request->section, $request->facultyID, $request->number_of_vacant_seats, $request->prerequisite_course_code);

        return response()->json($data);
    }

    public function editAnExistingCourse(Request $request)
    {
        $data = $this->courseService->editAnExistingCourse($request->course_code, $request->course_name, $request->department, $request->description, $request->credit, $request->section, $request->facultyID, $request->number_of_vacant_seats, $request->prerequisite_course_code);

        return response()->json($data);
    }

    public function assignScheduleForCourses(Request $request)
    {
        $data = $this->scheduleService->assignScheduleForCourses($request->week_no, $request->day_of_week, $request->start_time, $request->end_time, $request->room_no, $request->facultyID, $request->courseID);

        return response()->json($data);
    }

    public function getAllLeaveApplicationRequests(Request $request)
    {
        $data = $this->leaveApplicationService->getAllLeaveApplicationRequests();

        return response()->json($data);
    }

    public function reviewALeaveApplicationRequest(Request $request)
    {
        $data = $this->leaveApplicationService->reviewALeaveApplicationRequest($request->leave_id, $request->leave_status);

        return response()->json($data);
    }

    public function getAllCourses(Request $request)
    {
        $data = $this->courseService->getAllCourses();

        return response()->json($data);
    }

    public function updateVariables(Request $request)
    {
        $data = $this->variableService->updateVariables($request->current_semester, $request->semester_starting_date, $request->current_week_no, $request->current_day_of_week);

        return response()->json($data);
    }


     public function getVariables(Request $request)
    {
        $data = $this->variableService->getVariables();

        return response()->json($data[0]);
    }
    
}
