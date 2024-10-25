<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Student;

class StudentParent extends Model
{
    /** @use HasFactory<\Database\Factories\StudentParentFactory> */
    use HasFactory;

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    protected $fillable = [
        'type',
        'education',
        'fullname',
        'income',
        'occupation',
        'phone',
        'student_id'
    ];
}
