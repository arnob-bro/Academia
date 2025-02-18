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

     $data = $this->authService->registerStudent($request->name,$profilePhotoPath, $request->department,$request->studentID, $request->current_semester,$request->enrollment_semester,bcrypt($request->studentID));
        return response()->json($data);
    
    }

    public function registerFaculty(Request $request)
    {
    $profilePhotoPath = '';  

     $data = $this->authService->registerFaculty($request->name,$profilePhotoPath, $request->department,$request->facultyID, $request->rank,$request->administrative_role,bcrypt($request->facultyID));
        return response()->json($data);
    
    }
}
