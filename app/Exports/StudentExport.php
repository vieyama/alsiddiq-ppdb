<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

Carbon::setLocale('id');

class StudentExport implements FromCollection, WithHeadings, WithMapping
{
    public function headings(): array
    {
        return [
            'NO. PENDAFTARAN',
            'TINGKAT',
            'KELAS',
            'NIS',
            'NISN',
            'NIK',
            'NAMA LENGKAP',
            'JENIS KELAMIN',
            'TEMPAT, TANGGAL LAHIR',
            'AGAMA',
            'STATUS DALAM KELUARGA',
            'ALAMAT SISWA',
            'NO. HANDPHONE'
        ];
    }

    public function map($student): array
    {
        return [
            $student->student_registration->register_number,
            strtoupper($student->level),
            $student->grade,
            $student->nis,
            $student->nisn,
            $student->nik,
            $student->fullname,
            $student->gender === 'male' ? 'Laki-Laki' : 'Perempuan',
            $student->pob . ', ' . Carbon::parse($student->dob)->translatedFormat('d F Y'),
            ucfirst($student->religion),
            $student->familiy_status === 'biological' ? 'Anak Kandung' : 'Anak Angkat',
            $student->address,
            $student->phone
        ];
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $student = Student::orderBy('created_at', 'desc')->with('student_registration')->with('parents')->get();
        return $student;
    }
}
