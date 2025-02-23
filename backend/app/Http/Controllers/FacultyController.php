<?php

namespace App\Http\Controllers;
use App\Services\ScheduleService;

use Illuminate\Http\Request;

class FacultyController extends Controller
{
    private $scheduleService;

    public function __construct(ScheduleService $scheduleService)
    {
        $this->scheduleService = $scheduleService;

    }

    public function rescheduleClass(Request $request)
    {
        $data = $this->scheduleService->rescheduleClass($request->old_week_no, $request->old_day_of_week, $request->old_start_time, $request->facultyID, $request->new_week_no, $request->new_day_of_week, $request->new_start_time, $request->new_end_time, $request->new_room_no);

        return response()->json($data);
    }
}
