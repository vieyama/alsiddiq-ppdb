import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import StudentTableProfile from './Component/Profile/StudentTableProfile';
import ParentTableProfile from './Component/Profile/ParentTableProfile';
import SchoolTableProfile from './Component/Profile/SchoolTableProfile';
import GradesTableProfile from './Component/Profile/GradesTableProfile';
import UpdatePhotoModal from './Component/Profile/UpdatePhotoModal';

export default function Profile() {
    const user = usePage().props.auth.user;
    const student = usePage().props.student;
    const studentRegistration = student?.student_registration;
    const parent = usePage().props?.parent;
    const school = usePage().props?.school;
    const report = usePage().props?.report;
    const grades = usePage().props?.grades;

    const [selectedCollapseId, setSelectedCollapseId] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Profile</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/logo-white.png" />
            </Head>

            <div className='flex flex-col gap-4'>

                <div className="border border-gray-400 rounded-md collapse collapse-plus">
                    <input type="checkbox" className="peer" checked={selectedCollapseId === 0} readOnly />
                    <div
                        className="text-lg font-semibold collapse-title" onClick={() => setSelectedCollapseId(selectedCollapseId === 0 ? 4 : 0)}>
                        Biodata Siswa
                    </div>
                    <div className="collapse-content">
                        <div className='flex flex-col items-center gap-5 mb-5'>
                            <div className="avatar">
                                <div className="w-24 rounded">
                                    <img src={user?.photo ? `/uploads/${user.photo}` : "/user.png"} />
                                </div>
                            </div>
                            <button className='btn btn-sm' onClick={() => setIsOpenModal(true)}>Ubah Foto</button>
                        </div>
                        <StudentTableProfile student={student} studentRegistration={studentRegistration} />
                    </div>
                </div>

                <div className="border border-gray-400 rounded-md collapse collapse-plus">
                    <input type="checkbox" className="peer" checked={selectedCollapseId === 1} readOnly />
                    <div
                        className="text-lg font-semibold collapse-title" onClick={() => setSelectedCollapseId(selectedCollapseId === 1 ? 4 : 1)}>
                        Data Orang Tua
                    </div>
                    <div className="collapse-content">
                        <ParentTableProfile parent={parent} />

                    </div>
                </div>

                <div className="border border-gray-400 rounded-md collapse collapse-plus">
                    <input type="checkbox" className="peer" checked={selectedCollapseId === 2} readOnly />
                    <div
                        className="text-lg font-semibold collapse-title" onClick={() => setSelectedCollapseId(selectedCollapseId === 2 ? 4 : 2)}>
                        Data Sekolah
                    </div>
                    <div className="collapse-content">
                        <SchoolTableProfile school={school} />

                    </div>
                </div>

                <div className="border border-gray-400 rounded-md collapse collapse-plus">
                    <input type="checkbox" className="peer" checked={selectedCollapseId === 3} readOnly />
                    <div
                        className="text-lg font-semibold collapse-title" onClick={() => setSelectedCollapseId(selectedCollapseId === 3 ? 4 : 3)}>
                        Data Nilai
                    </div>
                    <div className="collapse-content">
                        <GradesTableProfile report={report} grades={grades} />
                    </div>
                </div>
            </div>
            <UpdatePhotoModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </AuthenticatedLayout>
    );
}
