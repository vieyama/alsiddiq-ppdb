import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import StudentTableProfile from './Component/Profile/StudentTableProfile';
import ParentTableProfile from './Component/Profile/ParentTableProfile';
import SchoolTableProfile from './Component/Profile/SchoolTableProfile';
import GradesTableProfile from './Component/Profile/GradesTableProfile';

export default function Profile() {
    const student = usePage().props.student;
    const studentRegistration = student?.student_registration;
    const parent = usePage().props?.parent;
    const school = usePage().props?.school;
    const report = usePage().props?.report;
    const grades = usePage().props?.grades;
    console.log(usePage().props);

    const [selectedCollapseId, setSelectedCollapseId] = useState(0)

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Dashboard</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>


            <div className='flex flex-col gap-4'>
                <div className="border border-gray-400 rounded-md collapse collapse-plus" onClick={() => setSelectedCollapseId(selectedCollapseId === 0 ? 3 : 0)}>
                    <input type="radio" name="my-accordion-3" checked={selectedCollapseId === 0} onChange={() => setSelectedCollapseId(0)} />
                    <div className="text-lg font-semibold collapse-title">Biodata Siswa</div>
                    <div className="collapse-content">
                        <div className="pl-3 avatar">
                            <div className="w-24 rounded">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <StudentTableProfile student={student} studentRegistration={studentRegistration} />
                    </div>
                </div>
                <div className="border border-gray-400 rounded-md collapse collapse-plus" onClick={() => setSelectedCollapseId(selectedCollapseId === 1 ? 3 : 1)}>
                    <input type="radio" name="my-accordion-3" checked={selectedCollapseId === 1} onChange={() => setSelectedCollapseId(1)} />
                    <div className="text-lg font-semibold collapse-title">Data Orang Tua</div>
                    <div className="collapse-content">
                        <ParentTableProfile parent={parent} />
                    </div>
                </div>
                <div className="border border-gray-400 rounded-md collapse collapse-plus" onClick={() => setSelectedCollapseId(selectedCollapseId === 2 ? 3 : 2)}>
                    <input type="radio" name="my-accordion-3" checked={selectedCollapseId === 2} onChange={() => setSelectedCollapseId(2)} />
                    <div className="text-lg font-semibold collapse-title">Data Sekolah</div>
                    <div className="collapse-content">
                        <SchoolTableProfile school={school} />
                    </div>
                </div>
                <div className="border border-gray-400 rounded-md collapse collapse-plus" onClick={() => setSelectedCollapseId(selectedCollapseId === 2 ? 3 : 2)}>
                    <input type="radio" name="my-accordion-3" checked={selectedCollapseId === 2} onChange={() => setSelectedCollapseId(2)} />
                    <div className="text-lg font-semibold collapse-title">Data Nilai</div>
                    <div className="collapse-content">
                        <GradesTableProfile report={report} grades={grades} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
