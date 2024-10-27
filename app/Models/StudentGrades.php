<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentGrades extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'grade',
        'type',
        'student_id',
    ];
}
