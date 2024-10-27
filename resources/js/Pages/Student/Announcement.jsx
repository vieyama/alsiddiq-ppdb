import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Head, usePage } from '@inertiajs/react';
import { AnnouncementComponent } from './Component/AnnouncementComponent';
import { ProofofRegistrationPrint } from './Component/Print/ProofofRegistrationPrint';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ProofofVerificationPrint } from './Component/Print/ProofofVerificationPrint';
import { ProofofPassedPrint } from './Component/Print/ProofofPassedPrint';

export default function Announcement() {
    const { t } = useTranslation()
    const user = usePage().props.auth.user;
    const student = usePage().props.student;
    const studentRegistration = usePage().props.studentRegistration;
    const parents = usePage().props.parent;
    const school = usePage().props.school;

    const contentRef = useRef();

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

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Announcement</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/logo-white.png" />
            </Head>


            <div className="w-full card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title">
                        <MegaphoneIcon className='size-5' />
                        Pengumuman
                    </h2>
                    <AnnouncementComponent studentRegistration={studentRegistration} user={user} onClickPrint={onClickPrint} />
                </div>
            </div>

            <div className='hidden'>
                <ProofofRegistrationPrint ref={contentRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} t={t} />
                <ProofofVerificationPrint ref={registrationRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} />
                <ProofofPassedPrint ref={passedRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} />
            </div>
        </AuthenticatedLayout>
    );
}
