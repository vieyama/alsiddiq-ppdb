import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Head, usePage } from '@inertiajs/react';
import { AnnouncementComponent } from './Component/AnnouncementComponent';

export default function Announcement() {
    const user = usePage().props.auth.user;
    const student = usePage().props.student;
    const studentRegistration = student?.student_registration;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Dashboard</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>


            <div className="w-full card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title">
                        <MegaphoneIcon className='size-5' />
                        Pengumuman
                    </h2>
                    <AnnouncementComponent studentRegistration={studentRegistration} user={user} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
