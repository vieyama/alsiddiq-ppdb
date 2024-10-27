<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudentParent;
use App\Models\StudentPrevSchool;
use App\Models\StudentRegistration;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(20)->create();
        // Student::factory()->count(20)->create();
        // StudentRegistration::factory()->count(20)->create();
        // StudentParent::factory()->count(40)->create();
        StudentPrevSchool::factory()->count(20)->create();
    }
}
