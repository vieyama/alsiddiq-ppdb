import Head from '@/Components/Head'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import DataTable from 'react-data-table-component';

const StudentList = () => {
    const students = usePage().props.student;

    const columns = [
        {
            name: 'No Pendaftaran',
            selector: row => row.student_registration.register_number,
            sortable: true,
        },
        {
            name: 'Tingkat',
            selector: row => row.level,
            sortable: true,
        },
        {
            name: 'Kelas',
            selector: row => row.grade,
            sortable: true,
        },
        {
            name: 'NIS',
            selector: row => row.nis,
            sortable: true,
        },
        {
            name: 'NISN',
            selector: row => row.nisn,
            sortable: true,
        },
        {
            name: 'NIK',
            selector: row => row.nik,
            sortable: true,
        },
        {
            name: 'Nama Lengkap',
            selector: row => row.fullname,
            sortable: true,
        },
        {
            name: 'Status Verifikasi',
            selector: row => row.student_registration.status,
            sortable: true,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={students}
                    pagination
                />
            </div>

        </AuthenticatedLayout>
    )
}

export default StudentList
