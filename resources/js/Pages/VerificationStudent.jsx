import Head from '@/Components/Head'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { convertStatus } from '@/utils/converStatus';
import { debounce } from '@/utils/debounce';
import { CheckIcon, MagnifyingGlassIcon, PrinterIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import ModalEditVerification from './Admin/ModalEditVerification';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { VerificationPrintAdminPrint } from './Student/Component/Print/VerificationPrintAdmin';
import { yearsOptions } from '@/utils/yearOptions';

const VerificationStudent = () => {
    const students = usePage().props.students;
    const queryString = window.location.search;
    const ppdbSetting = usePage().props.ppdbSetting;
    const csrfToken = usePage().props.csrf_token;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search')
    const year = urlParams.get('year')

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [student, setStudent] = useState(null)

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
        const newStatus = status === 'verified' ? 'waiting-for-verification' : 'verified'
        router.patch('/verification-student/update', { id, status: newStatus }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
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

    const verificationRef = useRef();
    const handlePrintVerification = useReactToPrint({
        contentRef: verificationRef
    });

    const getStudentDetail = async (id) => {
        await axios.get(`/student-detail/${id}`).then(res => {
            setStudent(res.data)
            setTimeout(() => {
                handlePrintVerification()
            }, 1000)
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
            width: '130px',
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
            width: '150px',
        },
        {
            name: 'Nama Lengkap',
            selector: row => row.fullname,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Status Verifikasi',
            selector: (row) => <div className={`badge text-white ${row.student_registration.status === 'verified' ? 'bg-primary' : 'bg-error'}`}>{convertStatus(row.student_registration.status).text}</div>,
            sortable: true,
            width: '165px'
        },
        {
            name: 'Aksi',
            selector: row => <div className='flex gap-2'>
                <button className="rounded-md btn btn-default btn-xs" onClick={() => getStudentDetail(row.id)}>
                    <PrinterIcon className='size-4' />
                </button>
                <button onClick={() => handleVerification(row.student_registration.status, row.student_registration.id)} className={`text-black rounded-md btn ${row.student_registration.status === 'waiting-for-verification' ? 'bg-primary' : 'bg-error'} btn-xs`}>
                    {row.student_registration.status === 'waiting-for-verification' ? <CheckIcon className='size-4 fill-white' /> : <XMarkIcon className='size-4 fill-white' />}
                </button>
            </div>,
            sortable: true,
            width: '125px'
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            <div className='w-full pb-2 mb-2 border-b-2'>
                <span>Data Verifikasi</span>
            </div>
            <div className='pb-3 my-3 border-b-2'>
                <button className='h-10 font-bold text-white min-h-10 btn btn-primary' onClick={() => setIsOpenModal(true)}>Edit Materi & Jadwal Ujian</button>
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
                            <button onClick={() => batchVerification('verified')} className="rounded-md btn btn-default btn-xs bg-primary" title="Verifikasi">
                                <CheckIcon className='size-4 fill-white' />
                            </button>
                            <button onClick={() => batchVerification('waiting-for-verification')} className="rounded-md btn btn-default btn-xs bg-error" title="Batalkan">
                                <XMarkIcon className='size-4 fill-white' />
                            </button>
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

            {isOpenModal ? <ModalEditVerification isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} /> : null}
            <div className='hidden'>
                {student && <VerificationPrintAdminPrint ref={verificationRef} {...student} ppdbSetting={ppdbSetting} />}
            </div>
        </AuthenticatedLayout>
    )
}

export default VerificationStudent

