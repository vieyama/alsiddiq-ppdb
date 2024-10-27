import Head from '@/Components/Head'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";

const StudentList = () => {
    const students = usePage().props.student;
    console.log(students);

    const pagination = usePagination(
        students?.data,
        {
            state: {
                page: 0,
                size: 10,
            },
            onChange: (e) => {
                const page = e.payload.page + 1
                console.log(page);

                router.get(`/student-list?page=${page}`)
            },
        },
        {
            isServer: true,
        }
    );

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Siswa" />
            <div className="overflow-x-auto">
                <table className="table table-md table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th>No Pendaftaran</th>
                            <th>Tingkat</th>
                            <th>Kelas</th>
                            <th>NIS</th>
                            <th>NISN</th>
                            <th>NIK</th>
                            <th>Nama Lengkap</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.data.map(item => (
                            <tr item={item} key={item.id}>
                                <td>{item.student_registration.register_number}</td>
                                <td className='uppercase'>{item.level}</td>
                                <td>{item.grade}</td>
                                <td>{item.nis}</td>
                                <td>{item.nisn}</td>
                                <td>{item.nik}</td>
                                <td>{item.fullname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {students?.total && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Total Pages: {students?.total}</span>

                        <span>
                            Page:{" "}
                            {Array(students?.total / 10)
                                .fill()
                                .map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        style={{
                                            fontWeight:
                                                pagination.state.page === index ? "bold" : "normal",
                                        }}
                                        onClick={() => pagination.fns.onSetPage(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                        </span>
                    </div>
                )}
            </div>

        </AuthenticatedLayout>
    )
}

export default StudentList
