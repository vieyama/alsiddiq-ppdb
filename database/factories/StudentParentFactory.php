<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentParent>
 */
class StudentParentFactory extends Factory
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
            'type' => fake()->randomElement(['father', 'mother']),
            'education' => fake()->randomElement(['uneducated','SD','SMP','SMA','DIPLOMA','S1','S2','S3']),
            'fullname' => fake()->name(),
            'income' =>
            fake()->randomElement([
                '< 10 Juta (Million)',
                '10 - 20 Juta (Million)',
                '20 - 30 Juta (Million)',
                '30 - 40 Juta (Million)']),
            'occupation' =>
            fake()->randomElement(['labor','farmer','enterpreneur','militaryPolice','fisherman']),
            'phone' => fake()->randomNumber(8, true),

        ];
    }
}

