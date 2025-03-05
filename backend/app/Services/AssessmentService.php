<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class AssessmentService
{
    public function getAssessmentsByCourseAndSemester( $courseID)
    {
        $currentSemesterQuery = DB::select("SELECT current_semester FROM variables WHERE log_id = 1");
        if (empty($currentSemesterQuery)) {
            return ['error' => 'Current semester information not found'];
        }
        $current_semester = $currentSemesterQuery[0]->current_semester;

        try{
            $data = DB::select("CALL GetAssessmentsByCourseAndSemester(?,?)", [
            $courseID,$current_semester
        ]);

        return $data;

        }catch(\Exception $e){
            return [
            'error' => 'Course fetching of a faculty failed',
            'message' => $e->getMessage()
            ];
        }
    }
}