<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::statement("INSERT INTO variables (log_id, current_semester, semester_starting_date,current_week_no,current_day_of_week)
                VALUES (?, ?, ?,?,?)", [
                    1,"Spring24","2025-03-02",1,"Sunday"
        ]);

        // Insert Students
        $students = [
            ['arnob', 'CSE', 'arnob.cse.20220104064@aust.edu', '20220104064', 'Spring24', 'Spring22'],
            ['mahdi', 'CSE', 'mahdi.cse.20220104058@aust.edu', '20220104058', 'Spring24', 'Spring22'],
            ['fiha', 'CSE', 'fiha.cse.20220104068@aust.edu', '20220104068', 'Spring24', 'Spring22'],
            ['tamim', 'EEE', 'tamim.eee.20220104070@aust.edu', '20220104070', 'Spring24', 'Spring22'],
            ['nashit', 'ME', 'nashit.me.20220104071@aust.edu', '20220104071', 'Spring24', 'Spring22'],
            ['rahim', 'CSE', 'rahim.cse.20220104072@aust.edu', '20220104072', 'Spring24', 'Spring22'],
            ['karim', 'EEE', 'karim.eee.20220104073@aust.edu', '20220104073', 'Spring24', 'Spring22'],
            ['jannat', 'BBA', 'jannat.bba.20220104074@aust.edu', '20220104074', 'Spring24', 'Spring22'],
            ['arif', 'CSE', 'arif.cse.20220104075@aust.edu', '20220104075', 'Spring24', 'Spring22'],
            ['mim', 'CSE', 'mim.cse.20220104076@aust.edu', '20220104076', 'Spring24', 'Spring22'],
            ['samin', 'ME', 'samin.me.20220104077@aust.edu', '20220104077', 'Spring24', 'Spring22'],
            ['rakib', 'EEE', 'rakib.eee.20220104078@aust.edu', '20220104078', 'Spring24', 'Spring22'],
            ['hasan', 'CSE', 'hasan.cse.20220104079@aust.edu', '20220104079', 'Spring24', 'Spring22'],
            ['ria', 'BBA', 'ria.bba.20220104080@aust.edu', '20220104080', 'Spring24', 'Spring22'],
            ['sakib', 'ME', 'sakib.me.20220104081@aust.edu', '20220104081', 'Spring24', 'Spring22'],
            ['tahsin', 'CSE', 'tahsin.cse.20220104082@aust.edu', '20220104082', 'Spring24', 'Spring22'],
            ['akash', 'EEE', 'akash.eee.20220104083@aust.edu', '20220104083', 'Spring24', 'Spring22'],
            ['tanvir', 'BBA', 'tanvir.bba.20220104084@aust.edu', '20220104084', 'Spring24', 'Spring22'],
            ['joy', 'ME', 'joy.me.20220104085@aust.edu', '20220104085', 'Spring24', 'Spring22'],
            ['sohan', 'CSE', 'sohan.cse.20220104086@aust.edu', '20220104086', 'Spring24', 'Spring22'],
            ['fahim', 'EEE', 'fahim.eee.20220104087@aust.edu', '20220104087', 'Spring24', 'Spring22'],
            ['hossain', 'BBA', 'hossain.bba.20220104088@aust.edu', '20220104088', 'Spring24', 'Spring22'],
            ['omar', 'ME', 'omar.me.20220104089@aust.edu', '20220104089', 'Spring24', 'Spring22'],
        ];


        foreach ($students as $student) {
            DB::statement("CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?, ?)", [
                $student[0],   // Name
                NULL,          // Profile Photo
                $student[1],   // Department
                $student[2],   // Institutional Email
                $student[3],   // Student ID
                $student[4],   // Current Semester
                $student[5],   // Enrollment Semester
                Hash::make($student[3]), // Hashed Password
            ]);
        }

        // Insert Faculties
        $faculties = [
            ['mr. X', 'CSE', 'X.cse.CSE2022001@aust.edu', 'CSE2022001', 'professor', 'HOD'],
            ['mr. Y', 'ME', 'Y.me.ME2022002@aust.edu', 'ME2022002', 'professor', 'HOD'],
            ['mr. Z', 'BBA', 'Z.bba.BBA2022003@aust.edu', 'BBA2022003', 'assistant professor', 'Chairman'],
            ['ms. A', 'CSE', 'A.cse.CSE2022004@aust.edu', 'CSE2022004', 'assistant professor', ''],
            ['dr. B', 'EEE', 'B.eee.EEE2022005@aust.edu', 'EEE2022005', 'lecturer', ''],
            ['dr. C', 'CSE', 'C.cse.CSE2022006@aust.edu', 'CSE2022006', 'assistant professor', ''],
            ['ms. D', 'ME', 'D.me.ME2022007@aust.edu', 'ME2022007', 'lecturer', ''],
            ['mr. E', 'CSE', 'E.cse.CSE2022008@aust.edu', 'CSE2022008', 'lecturer', ''],
            ['ms. F', 'EEE', 'F.eee.EEE2022009@aust.edu', 'EEE2022009', 'professor', ''],
            ['dr. G', 'BBA', 'G.bba.BBA2022010@aust.edu', 'BBA2022010', 'lecturer', ''],
            ['ms. H', 'ME', 'H.me.ME2022011@aust.edu', 'ME2022011', 'assistant professor', ''],
            ['dr. I', 'CSE', 'I.cse.CSE2022012@aust.edu', 'CSE2022012', 'professor', ''],
            ['mr. J', 'CSE', 'J.cse.CSE2022013@aust.edu', 'CSE2022013', 'assistant professor', ''],
            ['dr. K', 'EEE', 'K.eee.EEE2022014@aust.edu', 'EEE2022014', 'professor', ''],
            ['ms. L', 'ME', 'L.me.ME2022015@aust.edu', 'ME2022015', 'lecturer', ''],
        ];

        foreach ($faculties as $faculty) {
            DB::statement("CALL RegisterFaculty(?, ?, ?, ?, ?, ?, ?, ?)", [
                $faculty[0],   // Name
                NULL,          // Profile Photo
                $faculty[1],   // Department
                $faculty[2],   // Institutional Email
                $faculty[3],   // Faculty ID
                $faculty[4],   // Rank
                $faculty[5],   // Administrative Role
                Hash::make($faculty[3]), // Hashed Password
            ]);
        }

        $studentsInfos = [
            [
                "studentID" => "20220104064", 
                "first_name" => "Arnob", 
                "last_name" => "Islam", 
                "father_name" => "Md. Shahidul Islam", 
                "mother_name" => "Rashida Begum", 
                "birth_date" => "2001-04-15", 
                "nid" => "9876543210", 
                "birth_registration_No" => "BRN-12345", 
                "gender" => "Male", 
                "religion" => "Islam", 
                "blood_group" => "O+", 
                "road_house_flat_no" => "45/A, Main Road", 
                "country" => "Bangladesh", 
                "division" => "Dhaka", 
                "district" => "Dhaka", 
                "thana" => "Shahbagh, Dhaka", 
                "road_house_flat_no_permanent" => "Shahbagh, Dhaka", 
                "country_permanent" => "Bangladesh", 
                "division_permanent" => "Dhaka", 
                "district_permanent" => "Dhaka", 
                "thana_permanent" => "Shahbagh, Dhaka", 
                "guardian_name" => "Shamsul Arefin", 
                "guardian_mobile" => "01910020030", 
                "guardian_email" => "shamsul.arefin@gmail.com", 
                "mobile_number" => "01710020030", 
                "phone_number" => "01710020031", 
                "personal_email" => "arnob.islam@gmail.com"
            ],
            [
                "studentID" => "20220104058", 
                "first_name" => "Mahdi", 
                "last_name" => "Hossain", 
                "father_name" => "Md. Hossain", 
                "mother_name" => "Sultana Begum", 
                "birth_date" => "2002-02-20", 
                "nid" => "9876543220", 
                "birth_registration_No" => "BRN-12346", 
                "gender" => "Male", 
                "religion" => "Islam", 
                "blood_group" => "A+", 
                "road_house_flat_no" => "78/B, Block D", 
                "country" => "Bangladesh", 
                "division" => "Chittagong", 
                "district" => "Chittagong", 
                "thana" => "Anderkilla, Chittagong", 
                "road_house_flat_no_permanent" => "Anderkilla, Chittagong", 
                "country_permanent" => "Bangladesh", 
                "division_permanent" => "Chittagong", 
                "district_permanent" => "Chittagong", 
                "thana_permanent" => "Anderkilla, Chittagong", 
                "guardian_name" => "Rashedul Islam", 
                "guardian_mobile" => "01920020030", 
                "guardian_email" => "rashedul.islam@gmail.com", 
                "mobile_number" => "01720020030", 
                "phone_number" => "01720020031", 
                "personal_email" => "mahdi.hossain@gmail.com"
            ],
            [
                "studentID" => "20220104068", 
                "first_name" => "Fiha", 
                "last_name" => "Rahman", 
                "father_name" => "Md. Shahinur Rahman", 
                "mother_name" => "Fatema Begum", 
                "birth_date" => "2001-05-05", 
                "nid" => "9876543230", 
                "birth_registration_No" => "BRN-12347", 
                "gender" => "Female", 
                "religion" => "Islam", 
                "blood_group" => "B-", 
                "road_house_flat_no" => "29/C, Gulsan Road", 
                "country" => "Bangladesh", 
                "division" => "Rajshahi", 
                "district" => "Rajshahi", 
                "thana" => "Binodpur, Rajshahi", 
                "road_house_flat_no_permanent" => "Binodpur, Rajshahi", 
                "country_permanent" => "Bangladesh", 
                "division_permanent" => "Rajshahi", 
                "district_permanent" => "Rajshahi", 
                "thana_permanent" => "Binodpur, Rajshahi", 
                "guardian_name" => "Shahina Akter", 
                "guardian_mobile" => "01930020030", 
                "guardian_email" => "shahina.akter@gmail.com", 
                "mobile_number" => "01730020030", 
                "phone_number" => "01730020031", 
                "personal_email" => "fiha.rahman@gmail.com"
            ],
            [
                "studentID" => "20220104070", 
                "first_name" => "Tamim", 
                "last_name" => "Ahmed", 
                "father_name" => "Md. Abdul Aziz", 
                "mother_name" => "Anwara Begum", 
                "birth_date" => "2000-07-12", 
                "nid" => "9876543240", 
                "birth_registration_No" => "BRN-12348", 
                "gender" => "Male", 
                "religion" => "Islam", 
                "blood_group" => "O-", 
                "road_house_flat_no" => "5/D, Main Street", 
                "country" => "Bangladesh", 
                "division" => "Sylhet", 
                "district" => "Sylhet", 
                "thana" => "Mirzajangal, Sylhet", 
                "road_house_flat_no_permanent" => "Mirzajangal, Sylhet", 
                "country_permanent" => "Bangladesh", 
                "division_permanent" => "Sylhet", 
                "district_permanent" => "Sylhet", 
                "thana_permanent" => "Mirzajangal, Sylhet", 
                "guardian_name" => "Kazi Mahmudul", 
                "guardian_mobile" => "01940020030", 
                "guardian_email" => "kazi.mahmudul@gmail.com", 
                "mobile_number" => "01740020030", 
                "phone_number" => "01740020031", 
                "personal_email" => "tamim.ahmed@gmail.com"
            ],
            [
                "studentID" => "20220104071", 
                "first_name" => "Nashit", 
                "last_name" => "Khan", 
                "father_name" => "Md. Mominul Islam", 
                "mother_name" => "Nasima Sultana", 
                "birth_date" => "2002-01-10", 
                "nid" => "9876543250", 
                "birth_registration_No" => "BRN-12349", 
                "gender" => "Male", 
                "religion" => "Islam", 
                "blood_group" => "AB-", 
                "road_house_flat_no" => "99/E, Subidbazar", 
                "country" => "Bangladesh", 
                "division" => "Khulna", 
                "district" => "Khulna", 
                "thana" => "Sonadanga, Khulna", 
                "road_house_flat_no_permanent" => "Sonadanga, Khulna", 
                "country_permanent" => "Bangladesh", 
                "division_permanent" => "Khulna", 
                "district_permanent" => "Khulna", 
                "thana_permanent" => "Sonadanga, Khulna", 
                "guardian_name" => "Ibrahim Khalil", 
                "guardian_mobile" => "01950020030", 
                "guardian_email" => "ibrahim.khalil@gmail.com", 
                "mobile_number" => "01750020030", 
                "phone_number" => "01750020031", 
                "personal_email" => "nashit.khan@gmail.com"
            ],
        ];

        foreach ($studentsInfos as $studentsInfo) {
            DB::statement("CALL StoreAllInformationsOfStudent(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                $studentsInfo['studentID'],
                $studentsInfo['first_name'],
                $studentsInfo['last_name'],
                $studentsInfo['father_name'],
                $studentsInfo['mother_name'],
                $studentsInfo['birth_date'],
                $studentsInfo['nid'],
                $studentsInfo['birth_registration_No'],
                $studentsInfo['gender'],
                $studentsInfo['religion'],
                $studentsInfo['blood_group'],
                $studentsInfo['road_house_flat_no'],
                $studentsInfo['country'],
                $studentsInfo['division'],
                $studentsInfo['district'],
                $studentsInfo['thana'],
                $studentsInfo['road_house_flat_no_permanent'],
                $studentsInfo['country_permanent'],
                $studentsInfo['division_permanent'],
                $studentsInfo['district_permanent'],
                $studentsInfo['thana_permanent'],
                $studentsInfo['guardian_name'],
                $studentsInfo['guardian_mobile'],
                $studentsInfo['guardian_email'],
                $studentsInfo['mobile_number'],
                $studentsInfo['phone_number'],
                $studentsInfo['personal_email'],
            ]);
        }

        //create courses
        $facultyIDs = [
    'CSE2022001', 'ME2022002', 'BBA2022003', 'CSE2022004', 'EEE2022005',
    'CSE2022006', 'ME2022007', 'CSE2022008', 'EEE2022009', 'BBA2022010',
    'ME2022011', 'CSE2022012', 'CSE2022013', 'EEE2022014', 'ME2022015',
];

// Mock courses data with unique course_code and section combinations
$courses = [
    ['CSE101', 'Introduction to Computer Science', 'CSE', 'Basic computer science concepts and programming.', 3, 'A', $facultyIDs[0], 50, NULL],
    ['CSE102', 'Data Structures and Algorithms', 'CSE', 'Introduction to data structures and algorithmic techniques.', 3, 'B', $facultyIDs[3], 45, 'CSE101'],
    ['ME101', 'Introduction to Mechanical Engineering', 'ME', 'Fundamentals of mechanical engineering concepts.', 3, 'A', $facultyIDs[1], 40, NULL],
    ['BBA101', 'Principles of Management', 'BBA', 'Introduction to management principles and organizational behavior.', 3, 'A', $facultyIDs[2], 50, NULL],
    ['BBA102', 'Principles of Management', 'BBA', 'Introduction to management principles and organizational behavior.', 3, 'A', $facultyIDs[2], 50, NULL],
    ['EEE101', 'Introduction to Electrical Engineering', 'EEE', 'Basic electrical engineering concepts, circuits, and systems.', 3, 'A', $facultyIDs[4], 48, NULL],
    ['CSE201', 'Discrete Mathematics', 'CSE', 'Mathematical foundations for computer science and engineering.', 3, 'C', $facultyIDs[5], 40, 'CSE101'],
    ['ME201', 'Engineering Mechanics', 'ME', 'Study of forces and their effect on motion of bodies.', 3, 'B', $facultyIDs[6], 38, 'ME101'],
    ['CSE301', 'Operating Systems', 'CSE', 'Design and implementation of modern operating systems.', 3, 'A', $facultyIDs[7], 35, 'CSE102'],
    ['EEE201', 'Digital Logic Design', 'EEE', 'Fundamentals of digital logic circuits and systems.', 3, 'B', $facultyIDs[8], 45, 'EEE101'],
    ['BBA201', 'Business Economics', 'BBA', 'Basic economic principles and their application to business management.', 3, 'A', $facultyIDs[9], 50, 'BBA101'],
    ['ME301', 'Thermodynamics', 'ME', 'Study of energy conversion and thermodynamic systems.', 3, 'A', $facultyIDs[10], 37, 'ME201'],
    ['CSE401', 'Computer Networks', 'CSE', 'Introduction to networking protocols and systems.', 3, 'B', $facultyIDs[11], 30, 'CSE301'],
    ['CSE402', 'Database Management Systems', 'CSE', 'Design, implementation, and management of database systems.', 3, 'A', $facultyIDs[12], 32, 'CSE201'],
    ['EEE301', 'Electromagnetic Field Theory', 'EEE', 'Introduction to the principles of electromagnetism and field theory.', 3, 'A', $facultyIDs[13], 42, 'EEE201'],
    ['ME401', 'Fluid Mechanics', 'ME', 'Study of fluid behavior and fluid dynamics in engineering applications.', 3, 'A', $facultyIDs[14], 40, 'ME301'],
];


        // Loop through courses data and insert each using the stored procedure
        foreach ($courses as $course) {
            DB::statement("CALL CreateNewCourse(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                $course[0], // course_code
                $course[1], // course_name
                $course[2], // department
                $course[3], // description
                $course[4], // credits
                $course[5], // section
                $course[6], // facultyID
                $course[7], // number_of_vacant_seats
                $course[8]  // prerequisite_course_code
            ]);
        }

        //schedule seed
        $schedules = [
    // Week 1
    [1, 'Monday', '09:00:00', '10:00:00', 'Room 101', 'CSE2022001', 1],
    [1, 'Thursday', '10:00:00', '11:00:00', 'Room 101', 'CSE2022001', 1],
    
    [1, 'Tuesday', '11:00:00', '12:00:00', 'Room 102', 'CSE2022004', 2],
    [1, 'Friday', '09:00:00', '10:00:00', 'Room 102', 'CSE2022004', 2],
    
    [1, 'Wednesday', '09:00:00', '10:00:00', 'Room 103', 'EEE2022005', 3],
    [1, 'Thursday', '11:00:00', '12:00:00', 'Room 103', 'EEE2022005', 3],
    
    [1, 'Monday', '11:00:00', '12:00:00', 'Room 104', 'ME2022007', 4],
    [1, 'Wednesday', '10:00:00', '11:00:00', 'Room 104', 'ME2022007', 4],
    
    [1, 'Friday', '09:00:00', '10:00:00', 'Room 105', 'BBA2022003', 5],
    [1, 'Tuesday', '14:00:00', '15:00:00', 'Room 105', 'BBA2022003', 5],
    
    [1, 'Thursday', '13:00:00', '14:00:00', 'Room 106', 'CSE2022006', 6],
    [1, 'Tuesday', '15:00:00', '16:00:00', 'Room 106', 'CSE2022006', 6],
    
    [1, 'Wednesday', '13:00:00', '14:00:00', 'Room 107', 'EEE2022009', 7],
    [1, 'Friday', '14:00:00', '15:00:00', 'Room 107', 'EEE2022009', 7],
    
    [1, 'Tuesday', '09:00:00', '10:00:00', 'Room 108', 'ME2022011', 8],
    [1, 'Thursday', '15:00:00', '16:00:00', 'Room 108', 'ME2022011', 8],
    
    [1, 'Friday', '11:00:00', '12:00:00', 'Room 109', 'BBA2022010', 9],
    [1, 'Monday', '14:00:00', '15:00:00', 'Room 109', 'BBA2022010', 9],
    
    [1, 'Wednesday', '15:00:00', '16:00:00', 'Room 110', 'CSE2022012', 10],
    [1, 'Thursday', '14:00:00', '15:00:00', 'Room 110', 'CSE2022012', 10],

    // Week 2 (same courses, different days)
    [2, 'Monday', '09:00:00', '10:00:00', 'Room 101', 'CSE2022001', 1],
    [2, 'Thursday', '10:00:00', '11:00:00', 'Room 101', 'CSE2022001', 1],
    
    [2, 'Tuesday', '11:00:00', '12:00:00', 'Room 102', 'CSE2022004', 2],
    [2, 'Friday', '09:00:00', '10:00:00', 'Room 102', 'CSE2022004', 2],
    
    [2, 'Wednesday', '09:00:00', '10:00:00', 'Room 103', 'EEE2022005', 3],
    [2, 'Thursday', '11:00:00', '12:00:00', 'Room 103', 'EEE2022005', 3],
    
    [2, 'Monday', '11:00:00', '12:00:00', 'Room 104', 'ME2022007', 4],
    [2, 'Wednesday', '10:00:00', '11:00:00', 'Room 104', 'ME2022007', 4],
    
    [2, 'Friday', '09:00:00', '10:00:00', 'Room 105', 'BBA2022003', 5],
    [2, 'Tuesday', '14:00:00', '15:00:00', 'Room 105', 'BBA2022003', 5],
    
    [2, 'Thursday', '13:00:00', '14:00:00', 'Room 106', 'CSE2022006', 6],
    [2, 'Tuesday', '15:00:00', '16:00:00', 'Room 106', 'CSE2022006', 6],
    
    [2, 'Wednesday', '13:00:00', '14:00:00', 'Room 107', 'EEE2022009', 7],
    [2, 'Friday', '14:00:00', '15:00:00', 'Room 107', 'EEE2022009', 7],
    
    [2, 'Tuesday', '09:00:00', '10:00:00', 'Room 108', 'ME2022011', 8],
    [2, 'Thursday', '15:00:00', '16:00:00', 'Room 108', 'ME2022011', 8],
    
    [2, 'Friday', '11:00:00', '12:00:00', 'Room 109', 'BBA2022010', 9],
    [2, 'Monday', '14:00:00', '15:00:00', 'Room 109', 'BBA2022010', 9],
    
    [2, 'Wednesday', '15:00:00', '16:00:00', 'Room 110', 'CSE2022012', 10],
    [2, 'Thursday', '14:00:00', '15:00:00', 'Room 110', 'CSE2022012', 10],

    // Additional Weeks can follow similarly for weeks 3 to 5.
];

foreach ($schedules as $schedule) {
    DB::statement("CALL assignScheduleForCourses(?, ?, ?, ?, ?, ?, ?)", [
        $schedule[0],         // p_week_no
        $schedule[1],         // p_day_of_week
        $schedule[2],         // p_start_time
        $schedule[3],         // p_end_time
        $schedule[4],         // p_room_no
        $schedule[5],         // p_facultyID
        $schedule[6],         // p_courseID
    ]);
}



            $enrollments = [
                // CSE Students
                ['20220104064', 1],
                ['20220104058', 1],
                ['20220104068', 1],
                ['20220104072', 1],
                ['20220104075', 1],
                ['20220104076', 1],
                ['20220104079', 1],
                ['20220104082', 1],
                ['20220104086', 1]
            ];

            // Loop through enrollments and call stored procedure
            foreach ($enrollments as $enrollment) {
                DB::statement("CALL enrollInCourse(?, ?, ?, ?)", [
                    $enrollment[0],  // Student ID
                    $enrollment[1],  // Course Code
                    now(),           // Enrollment Date
                    'Spring24'       // Semester
                ]);
            }
    }
}
