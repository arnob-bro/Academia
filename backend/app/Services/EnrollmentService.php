<?php

namespace App\Services;

use App\Models\User;
use DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Exception;
class EnrollmentService
{

    public function checkPrerequisiteCompletion($studentID, $courseID) {
    // Get the prerequisite course code for the given course
    $prerequisiteCourseCode = DB::table('courses')
        ->where('courseID', $courseID)
        ->value('prerequisite_course_code');

    if (!$prerequisiteCourseCode) {
        // No prerequisite, so it's eligible
        return true;
    }

    // Check if the prerequisite course is completed with a minimum grade of 2
    $prerequisiteCompleted = DB::table('enrollments as e')
        ->join('course_grade_points as cgp', function ($join) {
            $join->on('e.studentID', '=', 'cgp.studentID')
                 ->on('e.courseID', '=', 'cgp.courseID');
        })
        ->join('courses as c', 'e.courseID', '=', 'c.courseID')
        ->where('e.studentID', $studentID)
        ->where('c.course_code', $prerequisiteCourseCode)
        ->where('cgp.grade_in_num', '>=', 2)
        ->exists();

    if (!$prerequisiteCompleted) {
        throw new Exception("Prerequisite course ($prerequisiteCourseCode) not completed.");
    }

    // Get the prerequisite's courseID to check further prerequisites
    $prerequisiteCourseID = DB::table('courses')
        ->where('course_code', $prerequisiteCourseCode)
        ->value('courseID');

    if ($prerequisiteCourseID) {
        // Recursively check for multilevel prerequisite completion
        return $this->checkPrerequisiteCompletion($studentID, $prerequisiteCourseID);
    }

    return true;
}



    public function enrollInCourse($studentID, $courseID)
    {
        try {
            DB::beginTransaction();

            // Step 1: Check if advising is enabled
            $advising = DB::table('variables')->value('advising');
            $enrollmentDate = Carbon::now()->toDateString();
            $enrollmentSemester = DB::table('variables')->value('current_semester');

            if (!$advising) {
                throw new Exception("Advising is currently OFF. Enrollment is not allowed.");
            }

            // Step 2: Validate Student & Course Existence
            $studentExists = DB::table('students')->where('studentID', $studentID)->exists();
            if (!$studentExists) {
                throw new Exception("Invalid student");
            }

            $courseExists = DB::table('courses')->where('courseID', $courseID)->exists();
            if (!$courseExists) {
                throw new Exception("Invalid course");
            }

            // Step 3: Check if Student is Already Enrolled in the Same Semester
            $alreadyEnrolled = DB::table('enrollments')
                ->where('studentID', $studentID)
                ->where('courseID', $courseID)
                ->where('enrollment_semester', $enrollmentSemester)
                ->exists();

            if ($alreadyEnrolled) {
                throw new Exception("Student has already enrolled in this course for the given semester");
            }

            // Step 4: Check Prerequisite Completion
            $prerequisiteCourseCode = DB::table('courses')
                ->where('courseID', $courseID)
                ->value('prerequisite_course_code');

            // Check if a prerequisite course exists
            if ($prerequisiteCourseCode) {
                // If prerequisite exists, check if the student has completed it
                $prerequisiteCompleted = DB::table('enrollments as e')
                    ->join('course_grade_points as cgp', function ($join) {
                        $join->on('e.studentID', '=', 'cgp.studentID')
                            ->on('e.courseID', '=', 'cgp.courseID');
                    })
                    ->join('courses as c', 'e.courseID', '=', 'c.courseID')
                    ->where('e.studentID', $studentID)
                    ->where('c.course_code', $prerequisiteCourseCode)
                    ->where('cgp.grade_in_num', '>=', 2)
                    ->exists();

                \Log::info("Prerequisite check for student {$studentID}: Prerequisite course code: {$prerequisiteCourseCode}, Completed: " . ($prerequisiteCompleted ? 'Yes' : 'No'));

                // If prerequisite not completed, throw an exception
                if (!$prerequisiteCompleted) {
                    throw new Exception("Prerequisite course not completed");
                }
            } else {
                \Log::info("No prerequisite course found for courseID: {$courseID}");
            }


            $conflictCount = DB::table('schedules as s1')
                ->join('enrollments as e', 'e.courseID', '=', 's1.courseID')
                ->join('schedules as s2', function ($join) use ($courseID) {
                    $join->on('s2.courseID', '=', DB::raw($courseID)); // Ensure direct binding
                })
                ->where('e.studentID', '=', $studentID)
                ->where('e.enrollment_semester', '=', $enrollmentSemester)
                ->whereColumn('s1.day_of_week', '=', 's2.day_of_week')
                ->where(function ($query) {
                    $query->whereRaw('s1.start_time < s2.end_time AND s1.end_time > s2.start_time');
                })
                ->selectRaw('COUNT(*) as conflict_count')
                ->first();

            if ($conflictCount->conflict_count > 0) {
                throw new Exception("Schedule conflict detected");
            }


            // Step 6: Check for Vacant Seats and Lock the Row
            $vacantSeats = DB::table('courses')
                ->where('courseID', $courseID)
                ->lockForUpdate()
                ->value('number_of_vacant_seats');

            if ($vacantSeats <= 0) {
                throw new Exception("No vacant seats available");
            }

            // Step 7: Determine Enrollment Type
            $isRetake = DB::table('course_grade_points')
                ->where('studentID', $studentID)
                ->where('courseID', $courseID)
                ->where('semester', $enrollmentSemester)
                ->exists();

            $enrollmentType = $isRetake ? "Retake" : "Normal";

            // Step 8: Insert Enrollment
            DB::table('enrollments')->insert([
                'enrollment_date' => $enrollmentDate,
                'enrollment_semester' => $enrollmentSemester,
                'enrollment_type' => $enrollmentType,
                'studentID' => $studentID,
                'courseID' => $courseID,
            ]);

            // Step 9: Decrease Available Seats
            DB::table('courses')
                ->where('courseID', $courseID)
                ->decrement('number_of_vacant_seats');

            DB::commit();
            return ["success" => true, "message" => "Enrollment successful"];

        } catch (Exception $e) {
            DB::rollBack();
            return ["success" => false, "message" => $e->getMessage()];
        }
    }


    public function fetchEnrolledCoursesOfAStudentOfASemester($studentID)
    {
        try{

            

            $data = DB::select("CALL fetchEnrolledCoursesOfAStudentOfASemester(?)", [
            $studentID
        ]);

        return $data;

        }catch(Exception $e){
            return [
            'error' => 'enrollment courses fetch failed!',
            'message' => $e->getMessage()
            ];
        }
    }

    public function removeCourseFromEnrollmentByStudent($studentID, $courseID)
    {
        try{

            $advising = DB::table('variables')->value('advising');
            $enrollmentSemester = DB::table('variables')->value('current_semester');

            if (!$advising) {
                throw new Exception("Advising is currently OFF. Enrollment deletion is not allowed.");
            }


            $enrolledCourses = $data = DB::select("CALL fetchEnrolledCoursesOfAStudentOfASemester(?)", [
            $studentID
        ]);

         $isEnrolled = collect($enrolledCourses)->contains('courseID', $courseID);

            if (!$isEnrolled) {
            throw new Exception("Course not found in the enrolled courses.");
        }

        // Delete the course enrollment
        $deleted = DB::delete(
            "DELETE FROM enrollments WHERE studentID = ? AND courseID = ? AND enrollment_semester = ?",
            [$studentID, $courseID, $enrollmentSemester]
        );

        if ($deleted) {
            return[
                'success' => true,
                'message' => 'Course removed successfully'];
        } else {
            return [
                'success' => false,
                'error' => 'enrollment course deletion failed!',
                'message' => 'Failed to remove the course'];
        }

        }catch(Exception $e){
            return [
                'success' => false,
                'error' => 'enrollment course deletion failed!',
                'message' => $e->getMessage()
            ];
        }
    }
}