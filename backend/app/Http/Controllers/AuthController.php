<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function loginUser(Request $request)
    {
        $data = $this->authService->loginUser($request->userID, $request->password);

        return response()->json($data);
    }
    public function registerStudent(Request $request)
{
    $profilePhotoPath = '';  

    try {
        
        $studentID = $request->studentID;
        $name = $request->name;
        $department = $request->department;
        $currentSemester = $request->current_semester;
        $enrollmentSemester = $request->enrollment_semester;
        $password = bcrypt($request->studentID); 

        // Call the stored procedure
        DB::statement("CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?)", [
            $name,
            $profilePhotoPath,  
            $department,
            $studentID,
            $currentSemester,
            $enrollmentSemester,
            $password,
        ]);

        return response()->json([
            'message' => 'Student registered successfully!',
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Registration failed!',
            'message' => $e->getMessage(),
        ], 500);
    }
}
}
