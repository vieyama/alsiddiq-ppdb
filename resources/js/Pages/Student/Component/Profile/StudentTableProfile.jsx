import React from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/id'
dayjs.locale('id')

const StudentTableProfile = ({ student, studentRegistration }) => {
    const { t } = useTranslation()

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <tbody>
                    <tr>
                        <th>No. Pendaftaran:</th>
                        <td>{studentRegistration?.register_number}</td>
                    </tr>
                    <tr>
                        <th>Tanggal Daftar:</th>
                        <td>{dayjs(student?.created_at).format('DD MMMM YYYY H:s')} WIB</td>
                    </tr>
                    <tr>
                        <th>NIS:</th>
                        <td>{student?.nis}</td>
                    </tr>
                    <tr>
                        <th>NISN:</th>
                        <td>{student?.nisn}</td>
                    </tr>
                    <tr>
                        <th>Nama Lengkap:</th>
                        <td>{student?.fullname}</td>
                    </tr>
                    <tr>
                        <th>Jenis Kelamin:</th>
                        <td>{student?.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}</td>
                    </tr>
                    <tr>
                        <th>Tempat, Tgl Lahir:</th>
                        <td>{student?.pob}, {dayjs(student?.dob).format('DD MMMM YYYY')}</td>
                    </tr>
                    <tr>
                        <th>Jarak dari rumah ke sekolah:</th>
                        <td className='capitalize'>{student?.school_distance}</td>
                    </tr>
                    <tr>
                        <th>Hobi:</th>
                        <td className='capitalize'>{student?.hobby}</td>
                    </tr>
                    <tr>
                        <th>Cita-cita:</th>
                        <td className='capitalize'>{student?.aspiration}</td>
                    </tr>
                    <tr>
                        <th>Agama:</th>
                        <td className='capitalize'>{student?.religion}</td>
                    </tr>
                    <tr>
                        <th>Status dalam Keluarga:</th>
                        <td className='capitalize'>{student?.familiy_status === 'biological' ? t('form.biological') : t('form.adopted')}</td>
                    </tr>
                    <tr>
                        <th>Alamat:</th>
                        <td>{student?.address}</td>
                    </tr>
                    <tr>
                        <th>No. Handphone:</th>
                        <td>{student?.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentTableProfile
