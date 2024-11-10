<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

Carbon::setLocale('id');
class StudentExportLms implements FromCollection, WithHeadings, WithMapping
{
    public function headings(): array
    {
        return [
            'NIPD',
            'PASSWORD',
            'NAMA LENGKAP',
            'ID JENIS KELAMIN',
            'NISN',
            'TMPT LAHIR',
            'TGL LAHIR',
            'NIK',
            'ID AGAMA',
            'KEBUTUHAN KHUSUS',
            'ALAMAT',
            'RT',
            'RW',
            'DUSUN',
            'KELURAHAN',
            'KECAMATAN',
            'KODE POS',
            'JENIS TINGGAL',
            'ALAT TRANSPORTASI',
            'TELEPON',
            'HP',
            'EMAIL',
            'SKHUN',
            'PENERIMA KPS',
            'NO KPS',
            'FOTO',
            'NAMA AYAH',
            'TAHUN LAHIR AYAH',
            'PENDIDIKAN AYAH',
            'PEKERJAAN AYAH',
            'PENGHASILAN AYAH',
            'KEBUTUHAN KHUSUS AYAH',
            'NO TELPON AYAH',
            'NAMA IBU',
            'TAHUN LAHIR IBU',
            'PENDIDIKAN IBU',
            'PEKERJAAN IBU',
            'PENGHASILAN IBU',
            'KEBUTUHAN KHUSUS IBU',
            'NO TELPON IBU',
            'NAMA WALI',
            'TAHUN LAHIR WALI',
            'PENDIDIKAN WALI',
            'PEKERJAAN WALI',
            'PENGHASILAN WALI',
            'ANGKATAN',
            'STATUS AWAL',
            'STATUS SISWA',
            'TINGKAT',
            'KODE KELAS',
            'KODE JURUSAN',
            'ID_SESI',
            'datetime',
            'waktu_logout'
        ];
    }

    public function getOccupationDescription($parents, $parentType)
    {
        $parent = collect($parents)->firstWhere('type', $parentType);
        if (!$parent) {
            return null;
        }
        switch ($parent['occupation']) {
            case 'labor':
                return 'Buruh';
            case 'farmer':
                return 'Petani';
            case 'enterpreneur':
                return 'Wiraswasta';
            case 'militaryPolice':
                return 'TNI/POLRI';
            case 'fisherman':
                return 'Nelayan';
            case 'housewife':
                return 'Ibu Rumah Tangga';

            default:
                return 'Profesi lain';
        }
    }

    public function map($student): array
    {
        $father = collect($student->parents)->firstWhere('type', 'father');
        $mother = collect($student->parents)->firstWhere('type', 'mother');
        $guardian = collect($student->parents)->firstWhere('type', 'guardian');


        $fatherOccupation = $this->getOccupationDescription($student->parents, 'father');
        $motherOccupation = $this->getOccupationDescription($student->parents, 'mother');
        $guardianOccupation = $this->getOccupationDescription($student->parents, 'guardian');

        return [
            '',
            $student->nis,
            $student->fullname,
            $student->gender === 'male' ? 1 : 2,
            $student->nisn,
            $student->pob,
            Carbon::parse($student->dob)->translatedFormat('d F Y'),
            $student->nik,
            $student->religion === 'islam' ? 1 : 2,
            'Tidak Ada',
            $student->address,
            '0',
            '0',
            '',
            '',
            '',
            '',
            'Bersama orang tua',
            '',
            $student->phone,
            $student->phone,
            '',
            '',
            '',
            '',
            '',
            $father->fullname,
            '',
            $father->education,
            $fatherOccupation,
            $father->income,
            '',
            $father->phone,
            $mother->fullname,
            '',
            $mother->education,
            $motherOccupation,
            $mother->income,
            '',
            $mother->phone,
            $guardian->fullname ?? '',
            '',
            $guardian->education ?? '',
            $guardianOccupation ?? '',
            $guardian->income ?? '',
            '',
            $guardian->phone ?? '',
            $student->student_registration->registration_year ?? '',
            'Baru',
            'Aktif',
            '',
            '',
            '',
            '',
            '',
            '',
        ];
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $student = Student::orderBy('created_at', 'desc')->with('student_registration')->with('parents')->with('user')->get();
        return $student;
    }
}
