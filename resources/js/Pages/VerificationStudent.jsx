import Head from '@/Components/Head'
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { convertStatus } from '@/utils/converStatus';
import { debounce } from '@/utils/debounce';
import { CheckIcon, MagnifyingGlassIcon, PrinterIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocation, useParams } from 'react-router-dom';

const VerificationStudent = () => {
    const students = usePage().props.students;
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search')
    console.log(students);

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
            selector: (row) => {
                console.log(convertStatus(row.student_registration.status).badgeType);

                return <div className={`badge ${convertStatus(row.student_registration.status).badgeType}`}>{convertStatus(row.student_registration.status).text}</div>
            },
            sortable: true,
            width: '165px'
        },
        {
            name: 'Aksi',
            selector: row => <div className='flex gap-2'>
                <button className="rounded-md btn btn-default btn-xs">
                    <PrinterIcon className='size-4' />
                </button>
                <button className={`text-black rounded-md btn ${row.student_registration.status === 'waiting-for-verification' ? 'bg-primary' : 'bg-error'} btn-xs`}>
                    {row.student_registration.status === 'waiting-for-verification' ? <CheckIcon className='size-4 fill-white' /> : <XMarkIcon className='size-4 fill-white' />}
                </button>
            </div>,
            sortable: true
        },
    ];

    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    const yearsOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearsList = [];

        for (let i = 0; i <= 20; i++) {
            yearsList.push(currentYear - i);
        }

        return yearsList;
    }

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const handleSearch = debounce((search) => {
        const url = new URL(window.location.href);
        url.searchParams.append('search', search.target.value);
        console.log(url);
        router.get(url.pathname + url.search)
    })

    const handleFilterYear = debounce((year) => {
        const url = new URL(window.location.href);
        url.searchParams.append('year', year.target.value);
        console.log(url);

        // console.log(window.location.pathname + window.location.search + `${search ? '&' : '?'}year=${year.target.value}`);

        // router.get(`/verification-student?search=${search.target.value}`)

    })

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            <div className='w-full pb-2 mb-2 border-b-2'>
                <span>Data Verifikasi</span>
            </div>
            <div className='pb-3 my-3 border-b-2'>
                <button className='h-10 font-bold text-white min-h-10 btn btn-primary'>Edit Materi & Jadwal Ujian</button>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <label className="relative flex items-center">
                        <div className="absolute left-2 opacity-70">
                            <MagnifyingGlassIcon className='size-5' />
                        </div>
                        <input
                            type="text"
                            placeholder='Cari disini'
                            className="w-full h-10 pl-8 border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
                            onChange={handleSearch}
                            defaultValue={search}
                            autoFocus={!!search}
                        />
                    </label>
                </div>
                <select className="min-h-10 select select-bordered" defaultValue="" onChange={handleFilterYear}>
                    {yearsOptions().map((item, key) => (
                        <option key={key} value={item}>Tahun {item}</option>
                    ))}
                </select>
            </div>
            <div className="mt-5 overflow-x-auto">
                {selectedRows.length > 0 &&
                    <div className='flex gap-2'>
                        <button className="rounded-md btn btn-default btn-xs bg-primary" title="Verifikasi">
                            <CheckIcon className='size-4 fill-white' />
                        </button>
                        <button className="rounded-md btn btn-default btn-xs bg-error" title="Batalkan">
                            <XMarkIcon className='size-4 fill-white' />
                        </button>
                    </div>}
                <DataTable
                    columns={columns}
                    data={students}
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggledClearRows}
                />
            </div>

        </AuthenticatedLayout>
    )
}

export default VerificationStudent

