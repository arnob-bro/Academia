<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class VariableService
{
    public function updateVariables($current_semester, $semester_starting_date, $current_week_no, $current_day_of_week)
    {
        DB::update("UPDATE variables
        SET
            current_semester=?,
            semester_starting_date=?,
            current_week_no=?,
            current_day_of_week=?
        WHERE log_id=?
            ", [
                $current_semester, $semester_starting_date, $current_week_no, $current_day_of_week,1
        ]);
        return [
            "message"=> "update variables successfull"
        ];
    }
}