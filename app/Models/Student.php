<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudentRegistration;
use App\Models\StudentParent;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

     protected $fillable = [
        'address',
        'dob',
        'familiy_status',
        'fullname',
        'gender',
        'grade',
        'level',
        'nik',
        'nis',
        'nisn',
        'phone',
        'pob',
        'religion',
        'school_distance',
        'hobby',
        'aspiration',
        'user_id'
    ];

    public function parents(): HasMany
    {
        return $this->hasMany(StudentParent::class, 'student_id');
    }

    public function student_registration(): HasOne
    {
        return $this->hasOne(StudentRegistration::class, 'student_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
