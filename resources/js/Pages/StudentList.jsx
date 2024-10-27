import Head from '@/Components/Head'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

const StudentList = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            StudentList
            <div className="join">
                <Link as="button" href='?page=1' className="join-item btn">1</Link>
                <button className="join-item btn">2</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">99</button>
                <button className="join-item btn">100</button>
            </div>
        </AuthenticatedLayout>
    )
}

export default StudentList
