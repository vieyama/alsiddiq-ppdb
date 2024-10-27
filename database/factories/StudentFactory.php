<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'address' =>
            fake()->address(),
            'dob' => fake()->date(),
            'familiy_status' => 'biological',
            'fullname' =>
            fake()->name(),
            'gender' => fake()->randomElement(['male', 'female']),
            'grade' => 7,
            'level' => 'smp',
            'nik' =>
            fake()->randomNumber(8, true),
            'nis' => fake()->randomNumber(8, true),
            'nisn' => fake()->randomNumber(8, true),
            'phone' => fake()->randomNumber(8, true),
            'pob' => 'Jakarta',
            'religion' => 'islam',
        ];
    }
}
