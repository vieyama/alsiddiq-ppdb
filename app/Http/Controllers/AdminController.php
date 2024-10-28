<?php

namespace App\Http\Controllers;

use App\Models\PpdbSetting;
use App\Models\Student;
use App\Models\StudentRegistration;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $year = date('Y');
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

        $currentYear = Carbon::now()->year;

        $data = StudentRegistration::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('registration_year', $currentYear)
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        foreach ($monthlyRegistrationData as $index => &$monthData) {
            $monthNumber = $index + 1;
            if (isset($data[$monthNumber])) {
                $monthData['total'] = $data[$monthNumber];
            }
        }

        $ppdbSetting = PpdbSetting::findOrFail(1);

        return Inertia::render('Dashboard', [
            'totalUserThisYear' => $totalUserThisYear,
            'totalUserThisYearPassed' => $totalUserThisYearPassed,
            'monthlyRegistrationData' => $monthlyRegistrationData,
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function studentList()
    {
        $student = Student::with('student_registration')->get();
        return Inertia::render('StudentList', [
            'student' => $student
        ]);
    }

    public function ppdbSetting()
    {
        $ppdbSetting = PpdbSetting::find(1);
        return Inertia::render('PpdbSetting', [
            'ppdbSetting' => $ppdbSetting
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $ppdbSetting = PpdbSetting::findOrFail((int)$id);

        if (empty($ppdbSetting)) {
            return redirect()->back()->withErrors(['error' => 'Data tidak ditemukan.']);
        }

        $ppdbSetting->status = $request->status ?? $ppdbSetting->status;
        $ppdbSetting->chairman = $request->chairman ?? $ppdbSetting->chairman;
        $ppdbSetting->registration_year = $request->registration_year ?? $ppdbSetting->registration_year;

        $ppdbSetting->save();
        return redirect()->back()->with([
            'success' => 'Data updated.',
            'data' => $ppdbSetting
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
