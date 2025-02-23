<?php

namespace App\Http\Controllers;
use App\Services\CourseService;
use App\Services\ScheduleService;

use Illuminate\Http\Request;

class AdminController extends Controller
{


    private $courseService;
    private $scheduleService;

    public function __construct(CourseService $courseService , ScheduleService $scheduleService)
    {
        $this->courseService = $courseService;
        $this->scheduleService = $scheduleService;

    }

    public function createNewCourse(Request $request)
    {
        $data = $this->courseService->createNewCourse($request->course_code, $request->course_name, $request->department, $request->description, $request->credit, $request->section, $request->facultyID);

        return response()->json($data);
    }

    public function editAnExistingCourse(Request $request)
    {
        $data = $this->courseService->editAnExistingCourse($request->course_code, $request->course_name, $request->department, $request->description, $request->credit, $request->section, $request->facultyID);

        return response()->json($data);
    }

    public function assignScheduleForCourses(Request $request)
    {
        $data = $this->scheduleService->assignScheduleForCourses($request->week_no, $request->day_of_week, $request->start_time, $request->end_time, $request->room_no, $request->facultyID, $request->courseID);

        return response()->json($data);
    }

    
}
