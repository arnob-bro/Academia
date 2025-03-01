<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FacultyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'loginUser']);
Route::post('/admin/student-admission', [AuthController::class, 'registerStudent']);
Route::post('/admin/faculty-registration', [AuthController::class, 'registerFaculty']);


Route::post('/admin/create-new-course', [AdminController::class, 'createNewCourse']);
Route::post('/admin/edit-an-existing-course', [AdminController::class, 'editAnExistingCourse']);
Route::post('/admin/course-schedule', [AdminController::class, 'assignScheduleForCourses']);
Route::post('/admin/all-leave-applications', [AdminController::class, 'getAllLeaveApplicationRequests']);
Route::get('/admin/leave-application-request', [AdminController::class, 'getAllLeaveApplicationRequests']);



Route::post('/faculty/course-reschedule', [FacultyController::class, 'rescheduleClass']);
Route::get('/faculty/room-schedule', [FacultyController::class, 'getAllScheduleOfASpecificRoomOfASpecificWeek']);
Route::post('/faculty/leave-application-request', [FacultyController::class, 'postLeaveApplicationRequest']);
Route::get('/faculty/leave-application-request', [FacultyController::class, 'getAllLeaveApplicationRequestsOfAFaculty']);



Route::post('/student/AllInformationsOfStudent', [StudentController::class, 'storeAllInformationsOfStudent']);
Route::post('/student/edit-all-information-of-student', [StudentController::class, 'editAllInformationOfStudent']);
Route::get('/student/weekly-schedule', [StudentController::class, 'getScheduleOfAStudent']);
Route::get('/student/daily-schedule', [StudentController::class, 'getDailyScheduleOfAStudent']);
Route::post('/student/course_enrollment', [StudentController::class, 'enrollInCourse']);