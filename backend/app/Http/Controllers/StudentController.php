<?php

namespace App\Http\Controllers;
use App\Services\UserInfoService;
use App\Services\ScheduleService;
use App\Services\EnrollmentService;
use App\Services\CourseService;
use App\Services\InfoService;

use Illuminate\Http\Request;

class StudentController extends Controller
{

    private $userInfoService;
    private $scheduleService;
    private $enrollmentService;
    private $courseService;
    private $infoService;

    public function __construct(UserInfoService $userInfoService, ScheduleService $scheduleService,EnrollmentService  $enrollmentService, CourseService $courseService, InfoService $infoService)
    {
        $this->userInfoService = $userInfoService;
        $this->scheduleService = $scheduleService;
        $this->enrollmentService = $enrollmentService;
        $this->courseService = $courseService;
        $this->infoService = $infoService;
    }

    public function storeAllInformationsOfStudent(Request $request)
    {

     $data = $this->userInfoService->storeAllInformationsOfStudent(
        $request->studentID, $request->first_name,$request->last_name,$request->father_name,$request->mother_name,$request->birth_date,$request->nid,$request->birth_registration_No,$request->gender,$request->religion,$request->blood_group,$request->road_house_flat_no,$request->country,$request->division,$request->district,$request->thana,$request->road_house_flat_no_permanent,$request->country_permanent,$request->division_permanent,$request->district_permanent,$request->thana_permanent,$request->guardian_name,$request->guardian_mobile,$request->guardian_email,$request->mobile_number,$request->phone_number,$request->personal_email
     );
        return response()->json($data);
    
    }

    public function editAllInformationOfStudent(Request $request)
    {

     $data = $this->userInfoService->editAllInformationOfStudent(
        $request->studentID, $request->first_name,$request->last_name,$request->father_name,$request->mother_name,$request->birth_date,$request->nid,$request->birth_registration_No,$request->gender,$request->religion,$request->blood_group,$request->road_house_flat_no,$request->country,$request->division,$request->district,$request->thana,$request->road_house_flat_no_permanent,$request->country_permanent,$request->division_permanent,$request->district_permanent,$request->thana_permanent,$request->guardian_name,$request->guardian_mobile,$request->guardian_email,$request->mobile_number,$request->phone_number,$request->personal_email
     );
        return response()->json($data);
    
    }


    public function getScheduleOfAStudent(Request $request)
    {

     $data = $this->scheduleService->getScheduleOfAStudent(
        $request->studentID,$request->week_no
     );
        return response()->json($data);
    
    }

    public function getDailyScheduleOfAStudent(Request $request)
    {

     $data = $this->scheduleService->getDailyScheduleOfAStudent(
        $request->studentID
     );
        return response()->json($data);
    
    }

    public function enrollInCourse(Request $request)
    {

     $data = $this->enrollmentService->enrollInCourse(
        $request->studentID,$request->courseID
     );
        return response()->json($data);
    
    }

    public function getAllCoursesForAdvising(Request $request)
    {
        $data = $this->courseService->getAllCoursesForAdvising();

        return response()->json($data);
    }

    public function fetchEnrolledCoursesOfAStudentOfASemester(Request $request)
    {
        $data = $this->enrollmentService->fetchEnrolledCoursesOfAStudentOfASemester($request->studentID);

        return response()->json($data);
    }

    // Change method signature to receive $studentID from route
        public function getStudentInfo(Request $request)
{
    try {
        $studentID = $request->studentID;
        // Log the received studentID to confirm
        \Log::info("Fetching student info for studentID: " . $studentID);
        
        $studentInfo = $this->infoService->getStudentInfo($studentID);
        
        if (!$studentInfo) {
            \Log::warning("No student data found for studentID: " . $studentID);
            return response()->json(['error' => 'Student not found'], 404);
        }
        
        return response()->json($studentInfo);
        
    } catch (\Exception $e) {
        \Log::error("Student info fetch error: " . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch student data: ' . $e->getMessage()], 500);
    }
}

}
