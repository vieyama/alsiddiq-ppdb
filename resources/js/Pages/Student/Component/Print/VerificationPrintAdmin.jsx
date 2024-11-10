import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
dayjs.locale('id')

export const VerificationPrintAdminPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, ppdbSetting } = props

    return (
        <div className='text-black relative font-calibri w-[210mm] h-[297mm]' ref={ref}>
            <img className='absolute top-0' src="/header.png" alt="" />
            <div className='px-10 relative top-[140px]'>
                <div className='mb-5'>
                    <u className='font-bold'>
                        <center>
                            HASIL VERIFIKASI PENDAFTARAN PPDB {studentRegistration?.registration_year}
                        </center>
                    </u>
                </div>

                <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />

                <table className="w-full mt-8 border border-black table-auto">
                    <thead>
                        <tr>
                            <th className="p-2 text-center border border-black">Materi dan Jadwal Ujian</th>
                            <th className="p-2 text-center border border-black w-28">Ket.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-24'>
                            <td className="p-2 align-top border border-black">
                                <span className="block text-left">
                                    <strong>{ppdbSetting?.verification_notes}</strong>
                                </span>
                            </td>
                            <td className="p-2 align-top border border-black"></td>
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
            <img className='absolute bottom-0' src="/footer.png" alt="" />
        </div>
    )
})
