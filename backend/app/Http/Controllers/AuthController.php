<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function Login(Request $req){
        $userID = $req->input('userID');
        $enteredPassword = $req->input('password');
        $data = $this->authService->Login($userID, $enteredPassword);
        return response()->json($data);
    }
}
