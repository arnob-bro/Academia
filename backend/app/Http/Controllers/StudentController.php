<?php

namespace App\Http\Controllers;
use App\Services\UserInfoService;
use App\Services\ScheduleService;

use Illuminate\Http\Request;

class StudentController extends Controller
{

    private $userInfoService;
    private $scheduleService;

    public function __construct(UserInfoService $userInfoService, ScheduleService $scheduleService)
    {
        $this->userInfoService = $userInfoService;
        $this->scheduleService = $scheduleService;
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
}
