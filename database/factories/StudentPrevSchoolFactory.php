<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentPrevSchool>
 */
class StudentPrevSchoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(),
            'exam_model' => 'UNBK | Computer-Based National Exam',
            'school_adress' => 'Jakarta',
            'school_name' =>
            fake()->randomElement(['SMAN 1 Jakarta', 'SMAN 2 Jakarta', 'SMAN 3 Jakarta','SMAN 4 Jakarta','SMAN 5 Jakarta','SMAN 6 Jakarta', 'SMAN 7 Jakarta']),
            'school_npsn' => fake()->randomNumber(8, true),
            'school_status' => 'NEGERI | Public',
            'year_of_graduation' => '2016',
        ];
    }
}
