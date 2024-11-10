<?php

namespace App\Http\Controllers;

use App\Exports\StudentExport;
use App\Exports\StudentExportLms;
use App\Models\PpdbSetting;
use App\Models\Student;
use App\Models\StudentGrades;
use App\Models\StudentParent;
use App\Models\StudentPrevSchool;
use App\Models\StudentRegistration;
use App\Models\StudentReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ppdbSetting = PpdbSetting::find(1);
        $year = $ppdbSetting->registration_year === (date('Y') + 1) ? $ppdbSetting->registration_year : (date('Y') + 1);
        $totalUserThisYear = DB::table('student_registrations')->where('registration_year', $year)->count();
        $totalUserThisYearPassed = DB::table('student_registrations')->where('registration_year', $year)->where('status', 'passed')->count();

        $months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        $monthlyRegistrationData = array_map(function ($month) {
            return ['month' => $month, 'total' => 0];
        }, $months);


        $data = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $year)
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        foreach ($monthlyRegistrationData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($data[$monthNumber])) {
                $monthData['total'] = $data[$monthNumber];
            }
        }

        return Inertia::render('Dashboard', [
            'totalUserThisYear' => $totalUserThisYear,
            'totalUserThisYearPassed' => $totalUserThisYearPassed,
            'monthlyRegistrationData' => $monthlyRegistrationData,
            'ppdbSetting' => $ppdbSetting
        ]);
    }
    public function statistic(Request $request)
    {
        $ppdbSetting = PpdbSetting::find(1);
        $year = $request->query('year') ?? ($ppdbSetting->registration_year >= (date('Y') + 1) ? $ppdbSetting->registration_year : (date('Y') + 1));
        $totalUserPerYear = DB::table('student_registrations')->where('registration_year', $year)->count();
        $totalUserPerYearPassed = DB::table('student_registrations')->where('registration_year', $year)->where('status', 'passed')->count();
        $totalUserPerYearVerified = DB::table('student_registrations')->where('registration_year', $year)->where('status', 'verified')->count();
        $totalUserPerYearNotPassed = DB::table('student_registrations')->where('registration_year', $year)->where('status', 'not_passed')->count();

        $months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        $monthlyTotalData = array_map(function ($month) {
            return ['month' => $month, 'total' => 0];
        }, $months);

        $monthlyVerifiedData = array_map(function ($month) {
            return ['month' => $month, 'total' => 0];
        }, $months);

        $monthlyPassedData = array_map(function ($month) {
            return ['month' => $month, 'total' => 0];
        }, $months);

        $monthlyNotPassedData = array_map(function ($month) {
            return ['month' => $month, 'total' => 0];
        }, $months);


        $dataTotal = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $year)
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        $dataVerified = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $year)
            ->where('status', 'verified')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        $dataPassed = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $year)
            ->where('status', 'passed')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        $dataNotPassed = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $year)
            ->where('status', 'not_passed')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        foreach ($monthlyTotalData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($dataTotal[$monthNumber])) {
                $monthData['total'] = $dataTotal[$monthNumber];
            }
        }

        foreach ($monthlyVerifiedData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($dataVerified[$monthNumber])) {
                $monthData['total'] = $dataVerified[$monthNumber];
            }
        }

        foreach ($monthlyPassedData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($dataPassed[$monthNumber])) {
                $monthData['total'] = $dataPassed[$monthNumber];
            }
        }

        foreach ($monthlyNotPassedData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($dataNotPassed[$monthNumber])) {
                $monthData['total'] = $dataNotPassed[$monthNumber];
            }
        }

        $ppdbSetting = PpdbSetting::find(1);

        return Inertia::render('Statistic', [
            'totalUserPerYear' => $totalUserPerYear,
            'totalUserPerYearPassed' => $totalUserPerYearPassed,
            'totalUserPerYearVerified' => $totalUserPerYearVerified,
            'totalUserPerYearNotPassed' => $totalUserPerYearNotPassed,
            'monthlyTotalData' => $monthlyTotalData,
            'monthlyVerifiedData' => $monthlyVerifiedData,
            'monthlyPassedData' => $monthlyPassedData,
            'monthlyNotPassedData' => $monthlyNotPassedData,
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    public function announcementStudent(Request $request)
    {
        $ppdbSetting = PpdbSetting::find(1);
        $search = $request->query('search');
        $year = $request->query('year') ?? ($ppdbSetting->registration_year >= (date('Y') + 1) ? $ppdbSetting->registration_year : (date('Y') + 1));

        $students = Student::whereHas('student_registration', function ($query) use ($year) {
            $query->whereIn('status', ['verified', 'passed', 'not_passed'])->where('registration_year', $year);
        })
            ->where(function ($query) use ($search) {
                $query->where('fullname', 'like', '%' . $search . '%')
                    ->orWhere('nis', 'like', '%' . $search . '%')
                    ->orWhere('nisn', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhereHas('student_registration', function ($query) use ($search) {
                        $query->where('register_number', 'like', '%' . $search . '%')
                            ->whereIn('status', ['verified', 'passed', 'not_passed']);
                    });
            })
            ->with('student_registration')->orderBy('created_at', 'desc')
            ->get();

        $ppdbSetting = PpdbSetting::find(1);
        return Inertia::render('AnnouncementStudent', [
            'students' => $students,
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    static function getStudentData(Int $id)
    {
        $student = Student::where('id', $id)->first();
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

        return response()->json([
            'student' => $student,
            'studentRegistration' => $studentRegistration,
            'school' => $school,
            'parents' => $parentsCollection,
            'grades' => $grades,
            'report' => $report
        ]);
    }

    public function verificationStudent(Request $request)
    {
        $search = $request->query('search');
        $ppdbSetting = PpdbSetting::find(1);
        $year = $request->query('year') ?? ($ppdbSetting->registration_year >= (date('Y') + 1) ? $ppdbSetting->registration_year : (date('Y') + 1));
        $students = Student::whereHas('student_registration', function ($query) use ($year) {
            $query->whereIn('status', ['verified', 'waiting-for-verification'])->where('registration_year', $year);
        })
            ->where(function ($query) use ($search) {
                $query->where('fullname', 'like', '%' . $search . '%')
                    ->orWhere('nis', 'like', '%' . $search . '%')
                    ->orWhere('nisn', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhereHas('student_registration', function ($query) use ($search) {
                        $query->where('register_number', 'like', '%' . $search . '%')
                            ->whereIn('status', ['verified', 'waiting-for-verification']);
                    });
            })
            ->with('student_registration')->orderBy('created_at', 'desc')
            ->get();

        $ppdbSetting = PpdbSetting::find(1);
        return Inertia::render('VerificationStudent', [
            'students' => $students,
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    public function ppdbSetting()
    {
        $ppdbSetting = PpdbSetting::find(1);
        return Inertia::render('PpdbSetting', [
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    public function updateVerification(Request $request): RedirectResponse
    {
        $studentRegistration = StudentRegistration::find($request->id);
        $studentRegistration->status = $request->status;
        $studentRegistration->save();

        return redirect()->back()->with([
            'success' => 'Data updated.'
        ]);
    }

    public function batchUpdateVerification(Request $request): RedirectResponse
    {
        StudentRegistration::whereIn('id', $request->ids)->update(['status' => $request->status]);
        return redirect()->back()->with([
            'success' => 'Data updated.'
        ]);
    }

    public function updatePpdbSetting(Request $request, string $id): RedirectResponse
    {
        $ppdbSetting = PpdbSetting::find((int)$id);

        if (empty($ppdbSetting)) {
            return redirect()->back()->withErrors(['error' => 'Data tidak ditemukan.']);
        }

        $ppdbSetting->status = $request->status ?? $ppdbSetting->status;
        $ppdbSetting->chairman = $request->chairman ?? $ppdbSetting->chairman;
        $ppdbSetting->registration_year = $request->registration_year ?? $ppdbSetting->registration_year;
        $ppdbSetting->verification_notes = $request->verification_notes ?? $ppdbSetting->verification_notes;

        $ppdbSetting->save();
        return redirect()->back()->with([
            'success' => 'Data updated.',
            'data' => $ppdbSetting
        ]);
    }

    public function updateSignature(Request $request)
    {
        Validator::make($request->all(), [
            'file' => ['required'],
        ])->validate();
        $ppdbSetting = PpdbSetting::find(1);
        $currentPhoto = $ppdbSetting->signature;

        // Define the custom public path
        $customPublicPath = base_path('../uploads');

        // Delete the current file if it exists
        $filePath = $customPublicPath . '/' . $currentPhoto;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $fileName = $ppdbSetting->chairman . time() . '.' . $request->file->extension();
        $ppdbSetting->signature = $fileName;

        $request->file->move($customPublicPath, $fileName);
        $ppdbSetting->save();
        return redirect()->back()->with('success', 'Signature updated.');
    }

    public function exportStudent()
    {
        return Excel::download(new StudentExport, 'Data Pendaftar.xlsx');
    }

    public function exportStudentLMS()
    {
        return Excel::download(new StudentExportLms, 'Data LMS.xlsx');
    }
}
