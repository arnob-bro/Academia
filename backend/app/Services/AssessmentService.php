<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class AssessmentService
{
    public function CreateAssessment($assessment_weight, $assessment_date, $assessment_type,$semester,$courseID)
    {
        
        
        try{

           
           DB::statement('CALL CreateAssessment(?,?,?,?,?)',[$assessment_weight, $assessment_date, $assessment_type,$semester,$courseID]);
            return [
                'message'=> 'Assessment has been created'
            ];
            
        }catch(\Exception $e){
            $data = ['error'=> $e];

        return $data;
        }
        
        
    }
    

}