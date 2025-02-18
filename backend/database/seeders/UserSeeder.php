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

DB::statement("INSERT INTO users (userID, password, role, created_at, updated_at) VALUES
    ('admin', '$adminPassword', 'admin', NOW(), NOW()),
    ('20220104064', '$studentPassword', 'student', NOW(), NOW()),
    ('CSE2022010', '$facultyPassword', 'faculty', NOW(), NOW())
");

    }
}
