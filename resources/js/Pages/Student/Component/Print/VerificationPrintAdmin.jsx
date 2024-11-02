import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Cop from './Cop'
dayjs.locale('id')

export const VerificationPrintAdminPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, ppdbSetting } = props

    return (
        <div className='p-10 text-black font-calibri' ref={ref}>
            {/* cop */}
            <Cop registrationYear={Number(studentRegistration.registration_year)} />
            <div className='mb-2'>
                <h4 align="center" className='mt-2 mb-4 font-bold'>
                    <u>HASIL VERIFIKASI PENDAFTARAN PPDB {studentRegistration?.registration_year}</u>
                </h4>
            </div>
            <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />

            <table className="table-auto border border-black w-full mt-8">
                <thead>
                    <tr>
                        <th className="border border-black p-2 text-center">Materi dan Jadwal Ujian</th>
                        <th className="border border-black p-2 text-center w-28">Ket.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='h-24'>
                        <td className="border border-black p-2 align-top">
                            <span className="text-left block">
                                <strong>{ppdbSetting?.verification_notes}</strong>
                            </span>
                        </td>
                        <td className="border border-black p-2 align-top"></td>
                    </tr>
                </tbody>
            </table>

            <div className='flex justify-end w-full mt-6'>
                <div className='mt-[6px] mr-3 w-[122px] h-[128px] border border-black flex items-center justify-center font-bold text-center'>
                    Pas Foto <br />
                    3 x 4
                </div>
                <div className='flex flex-col text-start'>
                    <span>Kota Bekasi, .................................. {dayjs().format('YYYY')}<br />Verifikator,</span>
                    <span className='mt-20'>(...............................................................)</span>
                </div>
            </div>

        </div>
    )
})
