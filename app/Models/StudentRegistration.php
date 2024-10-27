<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentRegistration extends Model
{
    /** @use HasFactory<\Database\Factories\StudentRegistrationFactory> */
    use HasFactory;

    protected $fillable = [
        'register_number',
        'student_id',
        'status',
        'registration_year',
        'announcement_number'
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'id');
    }
}
