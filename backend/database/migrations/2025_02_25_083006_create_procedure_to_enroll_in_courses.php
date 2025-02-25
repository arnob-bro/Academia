<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            CREATE PROCEDURE enrollInCourse(
                IN p_studentID VARCHAR(15),
                IN p_courseID INT,
                IN p_enrollment_date DATE,
                IN p_enrollment_semester VARCHAR(255)
            )
            BEGIN
                DECLARE v_prerequisite_course_code VARCHAR(50);
                DECLARE v_prerequisite_courseID INT;
                DECLARE v_conflict INT;
                DECLARE v_vacant_seats INT;
                DECLARE v_enrollment_type VARCHAR(15);

                -- Step 1: Start a transaction to ensure atomicity
                START TRANSACTION;

                -- Step 2: Validate if Student & Course Exist
                IF NOT EXISTS (SELECT 1 FROM students WHERE studentID = p_studentID) THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "Invalid student";
                END IF;

                IF NOT EXISTS (SELECT 1 FROM courses WHERE courseID = p_courseID) THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "Invalid course";
                END IF;

                -- Step 3: Check if Student is Already Enrolled in the Same Semester
                IF EXISTS (
                    SELECT 1 FROM enrollments 
                    WHERE studentID = p_studentID 
                    AND courseID = p_courseID 
                    AND enrollment_semester = p_enrollment_semester
                ) THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "Student has already enrolled in this course for the given semester";
                END IF;

                -- Step 4: Check Prerequisite Completion
                SELECT prerequisite_course_code INTO v_prerequisite_course_code
                FROM courses WHERE courseID = p_courseID;

                IF v_prerequisite_course_code IS NOT NULL THEN
                    -- Check if the student has completed any section of the prerequisite course
                    IF NOT EXISTS (
                        SELECT 1 
                        FROM enrollments e
                        JOIN course_grade_points cgp ON e.studentID = cgp.studentID AND e.courseID = cgp.courseID
                        JOIN courses c ON e.courseID = c.courseID  -- Join to find courses with matching code
                        WHERE e.studentID = p_studentID 
                        AND c.course_code = v_prerequisite_course_code  -- Any section of the prerequisite course
                        AND cgp.grade_in_num >= 2  -- Assuming passing grade is >= 2
                    ) THEN
                        SIGNAL SQLSTATE "45000"
                        SET MESSAGE_TEXT = "Prerequisite course not completed";
                    END IF;
                END IF;


                -- Step 5: Check for Schedule Conflicts
                SELECT COUNT(*) INTO v_conflict
                FROM schedules s1
                JOIN enrollments e ON e.courseID = s1.courseID
                JOIN schedules s2 ON s2.courseID = p_courseID
                WHERE e.studentID = p_studentID
                AND s1.day_of_week = s2.day_of_week
                AND e.enrollment_semester = p_enrollment_semester
                AND (
                    (s1.start_time >= s2.start_time AND s1.start_time < s2.end_time) OR
                    (s1.end_time > s2.start_time AND s1.end_time <= s2.end_time) OR
                    (s1.start_time <= s2.start_time AND s1.end_time >= s2.end_time)
                );

                IF v_conflict > 0 THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "Schedule conflict detected";
                END IF;

                -- Step 6: Check for Vacant Seats and Lock the Course Row for Update
                SELECT number_of_vacant_seats INTO v_vacant_seats 
                FROM courses 
                WHERE courseID = p_courseID
                FOR UPDATE;  -- Lock the row for the course to prevent race conditions

                IF v_vacant_seats <= 0 THEN
                    SIGNAL SQLSTATE "45000"
                    SET MESSAGE_TEXT = "No vacant seats available";
                END IF;

                -- Step 7: Determine Enrollment Type (Check Only for the Same Semester)
                IF EXISTS (
                    SELECT 1 FROM course_grade_points
                    WHERE studentID = p_studentID 
                    AND courseID = p_courseID 
                    AND semester = p_enrollment_semester
                ) THEN
                    SET v_enrollment_type = "Retake";
                ELSE
                    SET v_enrollment_type = "Normal";
                END IF;

                -- Step 8: Insert Enrollment & Reduce Vacant Seats
                INSERT INTO enrollments (enrollment_date, enrollment_semester, enrollment_type, studentID, courseID)
                VALUES (p_enrollment_date, p_enrollment_semester, v_enrollment_type, p_studentID, p_courseID);

                -- Reduce vacant seats in the course table (after enrollment)
                UPDATE courses
                SET number_of_vacant_seats = number_of_vacant_seats - 1
                WHERE courseID = p_courseID;

                -- Step 9: Commit the transaction to finalize changes
                COMMIT;

            END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('
        DROP PROCEDURE IF EXISTS enrollInCourse;
        
        ');
    }
};
