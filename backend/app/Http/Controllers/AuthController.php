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
        $Id = $req->input('Id');
        $Password = $req->input('Password');
        $data = $this->authService->Login($Id, $Password);
        return response()->json($data);
    }
}
