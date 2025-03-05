<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
class InfoService
{
    public function getStudentInfo($studentID)
{
    try {
        return DB::selectOne("
            CALL GetStudentInfoByID(?)
        ", [$studentID]);
    } catch (\Exception $e) {
        \Log::error("Stored procedure error: " . $e->getMessage());
        return null;
    }
}
            
        
}