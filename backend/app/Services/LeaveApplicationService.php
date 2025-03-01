<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class LeaveApplicationService
{
    public function postLeaveApplicationRequest($p_facultyID,$p_leave_type, $p_start_date, $p_end_date, $p_remarks )
    {
        try{
            DB::statement("CALL postLeaveApplicationRequest(?, ?, ?, ?, ?)", [
            $p_facultyID,$p_leave_type, $p_start_date, $p_end_date, $p_remarks 
        ]);

        return [
            'message' => 'New Leave Request has been filed',
            ];

        }catch(\Exception $e){
            return [
            'error' => 'Leave Request file failed!',
            'message' => $e->getMessage(),
            ];
        }
    }

    public function getAllLeaveApplicationRequestsOfAFaculty($p_facultyID)
    {
        try{
            $data = DB::select("CALL getAllLeaveApplicationRequestsOfAFaculty(?)", [
            $p_facultyID 
        ]);

        return [
            $data
            ];

        }catch(\Exception $e){
            return [
            'error' => 'fetching Leave Request file of a faculty failed!',
            'message' => $e->getMessage(),
            ];
        }
    }

    public function getAllLeaveApplicationRequests()
    {
        try{
            $data = DB::select("CALL getAllLeaveApplicationRequests()");

        return [
            $data
            ];

        }catch(\Exception $e){
            return [
            'error' => 'fetching All Leave Request file ',
            'message' => $e->getMessage(),
            ];
        }
    }
}