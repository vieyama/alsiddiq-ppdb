<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentRegistration>
 */
class StudentRegistrationFactory extends Factory
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
            'register_number' => 'PSB' . fake()->randomNumber(8, true),
            'status' =>
            fake()->randomElement(['waiting-for-verification', 'verified', 'passed']),
            'registration_year' => '2024',
            'announcement_number' => null,
        ];
    }
}
