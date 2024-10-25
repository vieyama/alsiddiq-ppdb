import React from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/id'
dayjs.locale('id')

const ParentTableProfile = ({ parent }) => {
    const { t } = useTranslation()

    return (
        <div className='flex flex-wrap items-center justify-around gap-5'>
            {parent.map((item, key) => (
                <div className="shadow-xl card bg-base-100 w-96" key={key}>
                    <div className="card-body">
                        <h2 className="card-title">{t(`form.${item.type}`)}</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <tbody>
                                    <tr>
                                        <th>Nama Lengkap:</th>
                                        <td>{item.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Pendidikan:</th>
                                        <td>{item.education}</td>
                                    </tr>
                                    <tr>
                                        <th>Pekerjaan:</th>
                                        <td>{item.occupation === '-' ? item.occupation : t(`form.${item.occupation}`)}</td>
                                    </tr>
                                    <tr>
                                        <th>Penghasilan:</th>
                                        <td>{item.income}</td>
                                    </tr>
                                    <tr>
                                        <th>No. Handphone:</th>
                                        <td>{item.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default ParentTableProfile
