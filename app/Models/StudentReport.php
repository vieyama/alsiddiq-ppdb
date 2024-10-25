<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject',
        'grade_smt_1',
        'grade_smt_2',
        'grade_smt_3',
        'grade_smt_4',
        'grade_smt_5',
    ];
}
