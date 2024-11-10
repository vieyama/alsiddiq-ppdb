import Head from '@/Components/Head'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { convertStatusForAnnouncemenet } from '@/utils/converStatus';
import { debounce } from '@/utils/debounce';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import ModalEditPassedNotes from './Admin/ModalEditPassedNotes';
import { yearsOptions } from '@/utils/yearOptions';

const AnnouncementStudent = () => {
    const students = usePage().props.students;
    const ppdbSetting = usePage().props.ppdbSetting;
    const csrfToken = usePage().props.csrf_token;
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search')
    const year = urlParams.get('year')

    const [isOpenModal, setIsOpenModal] = useState(false)

    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const handleSearch = debounce((search) => {
        const url = new URL(window.location.href);
        url.searchParams.append('search', search.target.value);
        router.get(url.pathname + url.search)
    })

    const handleFilterYear = debounce((year) => {
        const url = new URL(window.location.href);
        url.searchParams.append('year', year.target.value);
        router.get(url.pathname + url.search)
    })

    const handleVerification = (status, id) => {
        router.patch('/verification-student/update', { id, status }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        })
    }

    const batchVerification = (status) => {
        router.patch('/verification-student/batch-update', { ids: selectedRows.flatMap(item => item?.student_registration?.id), status }, {
            onSuccess: () => {
                setToggleClearRows(!toggledClearRows)
                setSelectedRows([])
            },
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
        })
    }

    const columns = [
        {
            name: 'No Pendaftaran',
            selector: row => row.student_registration?.register_number,
            sortable: true,
            width: '135px',
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
            width: '135px',
        },
        {
            name: 'NISN',
            selector: row => row.nisn,
            sortable: true,
            width: '135px',
        },
        {
            name: 'NIK',
            selector: row => row.nik,
            sortable: true,
            width: '135px',
        },
        {
            name: 'Nama Lengkap',
            selector: row => row.fullname,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Status Verifikasi',
            selector: (row) => (
                <div className={`badge text-white ${row.student_registration.status === 'passed' ? 'bg-primary' : 'bg-error'}`}>
                    {convertStatusForAnnouncemenet(row.student_registration.status).text}
                </div>
            ),
            sortable: true,
            width: '165px'
        },
        {
            name: 'Aksi',
            selector: row => (
                row.student_registration.status !== 'verified' ?
                    <button className='font-semibold text-white btn btn-error btn-xs' onClick={() => handleVerification('verified', row.student_registration.id)}><XMarkIcon className='size-4 fill-white' />Batal</button> :
                    <div className='flex gap-2'>
                        <button className='font-semibold text-white btn btn-error btn-xs' onClick={() => handleVerification('not_passed', row.student_registration.id)}><XMarkIcon className='size-4 fill-white' />Tidak Lulus</button>
                        <button className='font-semibold text-white btn btn-primary btn-xs' onClick={() => handleVerification('passed', row.student_registration.id)}><CheckIcon className='size-4 fill-white' />Lulus</button>
                    </div>
            ),
            sortable: true,
            width: '220px'
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            <div className='w-full pb-2 mb-2 border-b-2'>
                <span>Data Pengumuman</span>
            </div>
            <div className='pb-3 my-3 border-b-2'>
                <button className='h-10 font-bold text-white min-h-10 btn btn-primary' onClick={() => setIsOpenModal(true)}>Edit Keterangan Lulus</button>
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
                <select className="min-h-10 select select-bordered" defaultValue={year} onChange={handleFilterYear}>
                    {yearsOptions(Number(ppdbSetting.registration_year)).map((item, key) => (
                        <option key={key} value={item}>Tahun {item}</option>
                    ))}
                </select>
            </div>
            <div className="mt-5 overflow-x-auto">
                {selectedRows.length > 0 &&
                    <div className='flex items-center gap-2 mb-2'>
                        <span className='text-sm font-semibold'><b className='text-red-500'>{selectedRows.length} data terpilih</b>, Update Verifikasi?</span>
                        <div className='flex gap-2'>
                            <button className='font-semibold text-white btn btn-error btn-xs' onClick={() => batchVerification('verified')}><XMarkIcon className='size-4 fill-white' />Batalkan</button>
                            <button className='font-semibold text-white btn btn-error btn-xs' onClick={() => batchVerification('not_passed')}><XMarkIcon className='size-4 fill-white' />Tidak Lulus</button>
                            <button className='font-semibold text-white btn btn-primary btn-xs' onClick={() => batchVerification('passed')}><CheckIcon className='size-4 fill-white' />Lulus</button>
                        </div>
                    </div>
                }
                <DataTable
                    columns={columns}
                    data={students}
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggledClearRows}
                />
            </div>

            {isOpenModal ? <ModalEditPassedNotes isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} /> : null}
        </AuthenticatedLayout>
    )
}

export default AnnouncementStudent

