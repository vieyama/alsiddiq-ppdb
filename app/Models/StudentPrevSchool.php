<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPrevSchool extends Model
{
    /** @use HasFactory<\Database\Factories\StudentPrevSchoolFactory> */
    use HasFactory;

     protected $fillable = [
        'exam_model',
        'school_adress',
        'school_name',
        'school_npsn',
        'school_status',
        'year_of_graduation',
        'student_id',
    ];
}
