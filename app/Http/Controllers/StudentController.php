<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentGrades;
use App\Models\StudentParent;
use App\Models\StudentPrevSchool;
use App\Models\StudentReport;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    static function getStudentData()
    {
        $auth = Auth::user();
        $student = Student::where('user_id', $auth->id)->first();
        $studentRegistration = $student->student_registration;

        $parents = StudentParent::where('student_id', $student->id)->get();
        $school =
            StudentPrevSchool::where('student_id', $student->id)->first();
        $grades = StudentGrades::where('student_id', $student->id)->get();
        $report = StudentReport::where('student_id', $student->id)->get();

        $report->transform(function ($grade) {
            // Calculate the average of grade_smt_1 to grade_smt_5
            $average = (
            $grade->grade_smt_1 +
            $grade->grade_smt_2 +
            $grade->grade_smt_3 +
            $grade->grade_smt_4 +
            $grade->grade_smt_5
            ) / 5;

            // Add the average to the current grade item
            $grade->average = $average;

            return $grade;
        });

        $parentsCollection = collect($parents);

        // Check if any of the array items has the 'type' key set to 'guardian'
        $hasGuardian = $parentsCollection->contains(function ($parent) {
            return $parent['type'] === 'guardian';
        });

        // If no guardian is found, add dummy data
        if (!$hasGuardian) {
            $parentsCollection->push([
                'student_id' => $student->id,
                'type' => 'guardian',
                'fullname' => '-',
                'education' => '-',
                'occupation' => '-',
                'income' => '-',
                'phone' => '-',
            ]);
        }

        // Return the updated array
        $parentsCollection->toArray();

        return [
            'student' => $student,
            'studentRegistration' => $studentRegistration,
            'school' => $school,
            'parent' => $parentsCollection,
            'grades' => $grades,
            'report' => $report
        ];
    }

    public function index()
    {
        $studentData = self::getStudentData();

        return Inertia::render('Student/Dashboard', [
            'student' => $studentData['student'],
            'studentRegistration' => $studentData['studentRegistration'],
            'parent' => $studentData['parent'],
            'school' => $studentData['school']
        ]);
    }

    public function announcement()
    {
        $studentData = self::getStudentData();

        return Inertia::render('Student/Announcement', [
            'student' => $studentData['student'],
            'studentRegistration' => $studentData['studentRegistration'],
            'parent' => $studentData['parent'],
            'school' => $studentData['school'],
            'grades' => $studentData['grades'],
            'report' => $studentData['report'],
        ]);
    }

    public function profile()
    {
        $studentData = self::getStudentData();

        return Inertia::render('Student/Profile', [
            'student' => $studentData['student'],
            'studentRegistration' => $studentData['studentRegistration'],
            'parent' => $studentData['parent'],
            'school' => $studentData['school'],
            'grades' => $studentData['grades'],
            'report' => $studentData['report'],
        ]);
    }
}
