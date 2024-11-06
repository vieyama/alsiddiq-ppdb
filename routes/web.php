<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\CheckUserRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\EnsureStudent;

Route::get('/', function () {
    return Inertia::render('PPDB/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('ppdb');

Route::get('/ppdb', [PpdbController::class, 'index'])->name('ppdb.welcome');
Route::get('/ppdb/register', [PpdbController::class, 'register'])->name('ppdb.register');
Route::post('/ppdb/store', [PpdbController::class, 'store'])->name('ppdb.store');
Route::post('/ppdb/check', [PpdbController::class, 'check'])->name('ppdb.check');

Route::middleware(EnsureStudent::class)->group(function () {
    Route::get('/dashboard-student', [StudentController::class, 'index'])->name('dashboard-student');
    Route::get('/dashboard-student/announcement', [StudentController::class, 'announcement'])->name('announcement');
    Route::get('/dashboard-student/profile', [StudentController::class, 'profile'])->name('profile');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/update-photo', [ProfileController::class, 'updatePhoto'])->name('profile.update-photo');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
});

Route::middleware(['auth', CheckUserRole::class])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/verification-student', [AdminController::class, 'verificationStudent'])->name('verification-student');
    Route::get('/announcement-student', [AdminController::class, 'announcementStudent'])->name('announcement-student');
    Route::patch('/verification-student/update', [AdminController::class, 'updateVerification'])->name('verification-student-update');
    Route::patch('/verification-student/batch-update', [AdminController::class, 'batchUpdateVerification'])->name('verification-student-batch-update');
    Route::get('/ppdb-setting', [AdminController::class, 'ppdbSetting'])->name('ppdb-setting');
    Route::patch('/ppdb-setting/update/{id}', [AdminController::class, 'updatePpdbSetting'])->name('ppdb-setting-update');
    Route::post('/ppdb-setting-upload', [AdminController::class, 'updateSignature'])->name('ppdb-setting.update-photo');
    Route::get('/student-detail/{id}', [AdminController::class, 'getStudentData'])->name('student-data');
    Route::get('/statistic', [AdminController::class, 'statistic'])->name('statistic');
    Route::get('/export-student', [
    AdminController::class, 'exportStudent'])->name('export-student');
    Route::get('/export-student-lms', [AdminController::class, 'exportStudentLMS'])->name('export-student-lms');
});


require __DIR__ . '/auth.php';
