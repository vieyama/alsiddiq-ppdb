<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Student;
use App\Models\StudentParent;
use App\Models\StudentPrevSchool;
use App\Models\StudentRegistration;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;


class PpdbController extends Controller
{
    public function index()
    {
        return Inertia::render('PPDB/Welcome');
    }

    public function register()
    {
        return Inertia::render('PPDB/Register');
    }

    public static function generateRegistrationNumber(): string
    {
        // Step 1: Static prefix
        $prefix = "PSB";

        // Step 2: Get the current year and month (e.g., "1800" for year '18' and month '00')
        $yearMonth = date("ym");  // 'y' = last two digits of the year, 'm' = month

        // Step 3: Generate a unique number (could be a random number or sequence from a database)
        $uniqueNumber = str_pad(rand(1, 9999), 4, "0", STR_PAD_LEFT);  // Generate a random 4-digit number

        // Step 4: Combine the parts to form the registration number
        $registrationNumber = $prefix . $yearMonth . $uniqueNumber;

        return $registrationNumber;
    }

    public function store(Request $request): RedirectResponse
    {
        $nis = $request->studentData['nis'];
        $registrationNumber = self::generateRegistrationNumber($nis);

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->studentData['fullName'],
                'email' => $registrationNumber,
                'password' => Hash::make($nis),
                'user_type' => 'student'
            ]);

            $student = Student::create([
                'user_id' => $user->id,  // Reference the user created above
                'address' => $request->studentData['address'],
                'dob' => $request->studentData['dob'],
                'familiy_status' => $request->studentData['familiyStatus'],
                'fullname' => $request->studentData['fullName'],
                'gender' => $request->studentData['gender'],
                'grade' => $request->studentData['grade'],
                'level' => $request->studentData['level'],
                'nik' => $request->studentData['nik'],
                'nis' => $nis,
                'nisn' => $request->studentData['nisn'],
                'phone' => $request->studentData['phone'],
                'pob' => $request->studentData['pob'],
                'religion' => $request->studentData['religion'],
                'school_distance' => $request->studentData['schoolDistance'],
                'hobby' => $request->studentData['hobby'],
                'aspiration' => $request->studentData['aspiration'],
            ]);

            StudentRegistration::create([
                'register_number' => $registrationNumber,
                'student_id' => $student->id,
                'status' => 'waiting-for-verification',
                'registration_year' => date("Y")
            ]);

            // Father Data
            StudentParent::create([
                'student_id' => $student->id,  // Reference the student created above
                'type' => 'father',
                'fullname' => $request->parentData['father']['fullName'],
                'education' => $request->parentData['father']['education'],
                'occupation' => $request->parentData['father']['occupation'],
                'income' => $request->parentData['father']['income'],
                'phone' => $request->parentData['father']['phone'],
            ]);

            // Mother data
            StudentParent::create([
                'student_id' => $student->id,
                'type' => 'mother',
                'fullname' => $request->parentData['mother']['fullName'],
                'education' => $request->parentData['mother']['education'],
                'occupation' => $request->parentData['mother']['occupation'],
                'income' => $request->parentData['mother']['income'],
                'phone' => $request->parentData['mother']['phone'],
            ]);

            // Guardian data (only if the guardian has valid info)
            if (!empty($request->parentData['guardian']['fullName'])) {
                StudentParent::create([
                    'student_id' => $student->id,
                    'type' => 'guardian',
                    'fullname' => $request->parentData['guardian']['fullName'],
                    'education' => $request->parentData['guardian']['education'],
                    'occupation' => $request->parentData['guardian']['occupation'],
                    'income' => $request->parentData['guardian']['income'],
                    'phone' => $request->parentData['guardian']['phone'],
                ]);
            }
            if(!empty($request->previousSchoolData['schoolNpsn'])){
                StudentPrevSchool::create([
                    'exam_model' => $request->previousSchoolData['examModel'] ?? '',
                    'school_adress' => $request->previousSchoolData['schoolAdress'] ?? '',
                    'school_name' => $request->previousSchoolData['schoolName'] ?? '',
                    'school_npsn' => $request->previousSchoolData['schoolNpsn'] ?? '',
                    'school_status' => $request->previousSchoolData['schoolStatus'] ?? '',
                    'year_of_graduation' => $request->previousSchoolData['yearOfGraduation'] ?? '',
                    'student_id' => $student->id,
                ]);
            }

            // Commit the transaction
            DB::commit();
            event(new Registered($user));
            Auth::login($user);

            return redirect(route('dashboard-student', absolute: false));
        } catch (Exception $e) {
            // Rollback transaction for other exceptions
            DB::rollBack();
            return redirect(route('ppdb', absolute: false))->withErrors(['error' => 'Something went wrong!']);
        }
    }

    public function check(Request $request): RedirectResponse
    {
        $nis = $request->input('nis');   // Get NIS from request
        $nisn = $request->input('nisn'); // Get NISN from request

        // Check if a student with the same NIS or NISN already exists
        $existingStudent = Student::where('nis', $nis)
            ->orWhere('nisn', $nisn)
            ->first();

        if ($existingStudent) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'NIS or NISN already exists.'], 400);
            }

            return redirect()->back()->withErrors(['error' => 'NIS or NISN already exists.']);
        }

        return redirect()->back()->with('success', 'NIS or NISN is available.');
    }
}
