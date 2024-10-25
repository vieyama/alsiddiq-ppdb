import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowDownOnSquareIcon, DocumentTextIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Dashboard</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <div role="alert" className="p-4 text-center bg-primary">
                <span className='text-lg font-normal text-white'>Selamat Datang Calon Siswa, {user.name}</span>
            </div>

            <div className="flex flex-col w-full gap-3 mt-3 xl:flex-row">
                <div className='bg-[#8ABFA3] w-full xl:w-96 flex flex-col items-center justify-between gap-3 p-2 text-center text-white'>
                    <DocumentTextIcon className='text-white size-16' />
                    <span className='text-sm'>Biodata Pendaftaran</span>
                </div>
                <div className='bg-[#8ABFA3] w-full flex flex-col items-center justify-between gap-3 p-2 text-center text-white'>
                    <PrinterIcon className='text-white size-16' />
                    <span className='text-sm leading-4'>Cetak Bukti Pendaftaran, setelah Admin Sekolah melakukan Verifikasi Biaya Pendaftaran</span>
                </div>
                <div className='bg-[#8ABFA3] w-full xl:w-96 flex flex-col items-center justify-between gap-3 p-2 text-center text-white'>
                    <ArrowDownOnSquareIcon className='text-white size-16' />
                    <span className='text-sm'>Download Panduan</span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
