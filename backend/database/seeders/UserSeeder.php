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
        // DB::table('users')->insert([
        //     [
        //         'userID' => 'admin',
        //         'password' => bcrypt('123456'),
        //         'role' => 'admin',
        //         'created_at' => now(),
        //         'updated_at'=> now(),
                
        //     ],
        //     [
        //         'userID' => '20220104064',
        //         'password' => bcrypt('123456'),
        //         'role' => 'student',
        //         'created_at' => now(),
        //         'updated_at'=> now(),
                
        //     ],
        //     [
        //         'userID' => 'CSE2022010',
        //         'password' => bcrypt('123456'),
        //         'role' => 'faculty',
        //         'created_at' => now(),
        //         'updated_at'=> now(),
                
        //     ],
        // ]);

$adminPassword = bcrypt('123456');
$studentPassword = bcrypt('123456');
$facultyPassword = bcrypt('123456');

        DB::statement("
            CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?)
        ", [
            'arnob',         // Name
            NULL,            // ProfilePhoto (NULL)
            'CSE',           // Department
            '20220104064',   // studentID
            'Spring24',      // CurrentSemester
            'Spring22',      // EnrollmentSemester
            bcrypt('20220104064')        // Hashed password
        ]);

        DB::statement("
            CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?)
        ", [
            'mahdi',         // Name
            NULL,            // ProfilePhoto (NULL)
            'CSE',           // Department
            '20220104058',   // studentID
            'Spring24',      // CurrentSemester
            'Spring22',      // EnrollmentSemester
            bcrypt('20220104058')        // Hashed password
        ]);

        DB::statement("
            CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?)
        ", [
            'fiha',         // Name
            NULL,            // ProfilePhoto (NULL)
            'CSE',           // Department
            '20220104068',   // studentID
            'Spring24',      // CurrentSemester
            'Spring22',      // EnrollmentSemester
            bcrypt('20220104068')        // Hashed password
        ]);

        DB::statement("
            CALL RegisterFaculty(?, ?, ?, ?, ?, ?, ?)
        ", [
            'mr. X',         // Name
            NULL,            // ProfilePhoto (NULL)
            'CSE',           // Department
            'CSE2022001',   // facultyID
            'professor',      // rank
            'HOD',      // administrative_role
            bcrypt('CSE2022001')        // Hashed password
        ]);

        DB::statement("
            CALL RegisterFaculty(?, ?, ?, ?, ?, ?, ?)
        ", [
            'mr. Y',         // Name
            NULL,            // ProfilePhoto (NULL)
            'ME',           // Department
            'CSE2022002',   // facultyID
            'professor',      // rank
            'HOD',      // administrative_role
            bcrypt('CSE2022002')        // Hashed password
        ]);
    }
}
