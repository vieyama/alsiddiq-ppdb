import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowDownOnSquareIcon, DocumentTextIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { AnnouncementComponent } from './Component/AnnouncementComponent';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ProofofRegistrationPrint } from './Component/Print/ProofofRegistrationPrint';
import { ProofofVerificationPrint } from './Component/Print/ProofofVerificationPrint';
import Head from '@/Components/Head';
import { ProofofPassedPrint } from './Component/Print/ProofofPassedPrint';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const student = usePage().props?.student;
    const studentRegistration = usePage().props?.studentRegistration;
    const school = usePage().props?.school;
    const parents = usePage().props?.parent;
    const ppdbSetting = usePage().props?.ppdbSetting;

    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef
    });

    const registrationRef = useRef();
    const handlePrintRegistration = useReactToPrint({
        contentRef: registrationRef
    });

    const passedRef = useRef();
    const handlePrintPassed = useReactToPrint({
        contentRef: passedRef
    });

    const onClickPrint = (type) => {
        if (type === 'verified') {
            handlePrintRegistration()
        }
        if (type === 'passed') {
            handlePrintPassed()
        }
    }

    const printLabel = studentRegistration.status === "waiting-for-verification" ? 'Cetak Bukti Pendaftaran, setelah Admin Sekolah melakukan Verifikasi Biaya Pendaftaran' : 'Cetak Bukti Pendaftaran'

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div role="alert" className="p-4 text-center bg-primary">
                <span className='text-lg font-normal text-white'>Selamat Datang Calon Siswa, {user.name}</span>
            </div>

            <div className="flex flex-col w-full gap-3 mt-3 xl:flex-row">
                <Link href="/dashboard-student/profile" className='flex flex-col items-center justify-between w-full gap-3 p-2 text-center text-white bg-secondaryGreen xl:w-96'>
                    <DocumentTextIcon className='text-white size-16' />
                    <span className='text-sm'>Biodata Pendaftaran</span>
                </Link>
                <div onClick={() => studentRegistration.status !== 'waiting-for-verification' && handlePrint()} className='flex flex-col items-center justify-between w-full gap-3 p-2 text-center text-white cursor-pointer bg-secondaryGreen'>
                    <PrinterIcon className='text-white size-16' />
                    <span className='text-sm leading-4'>{printLabel}</span>
                </div>
                <a href="/Panduan_PPDB_Online.pdf" target='_blank' className='flex flex-col items-center justify-between w-full gap-3 p-2 text-center text-white bg-secondaryGreen xl:w-96'>
                    <ArrowDownOnSquareIcon className='text-white size-16' />
                    <span className='text-sm'>Download Panduan</span>
                </a>
            </div>
            <div className="w-full mt-3 shadow-xl card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title">
                        <MegaphoneIcon className='size-5' />
                        Pengumuman
                    </h2>
                    <AnnouncementComponent studentRegistration={studentRegistration} user={user} onClickPrint={onClickPrint} />
                </div>
            </div>

            <div className='hidden'>
                <ProofofPassedPrint ref={passedRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} ppdbSetting={ppdbSetting} />
                <ProofofRegistrationPrint ref={contentRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} ppdbSetting={ppdbSetting} />
                <ProofofVerificationPrint ref={registrationRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} ppdbSetting={ppdbSetting} />
            </div>
        </AuthenticatedLayout>
    );
}
