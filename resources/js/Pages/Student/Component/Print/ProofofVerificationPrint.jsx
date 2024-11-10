import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Ttd from './Ttd'
dayjs.locale('id')

export const ProofofVerificationPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, ppdbSetting } = props

    return (
        <div className='text-black relative border-black border-2 font-calibri w-[210mm] h-[297mm]' ref={ref}>
            <img className='absolute top-0' src="/header.png" alt="" />
            <div className='px-10 relative top-[140px]'>
                <div className='mb-5'>
                    <b className='leading-6'>
                        <h4 align="center" className='mt-2 mb-4 font-bold'>
                            <u>BUKTI VERIFIKASI</u>
                        </h4>
                    </b>
                </div>
                <span className='pl-8'>Ketua Panitia PPDB Al Siddiq International dengan ini menyatakan bahwa :</span>
                <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />
                <div className='flex justify-center my-5'>
                    <div className='w-3/4 p-2 text-center border border-black border-1'>
                        <span className='text-lg font-bold text-red-500'>SUDAH VERIFIKASI</span>
                    </div>
                </div>
                <span>
                    Sebagai Calon Peserta Didik Sekolah AL SIDDIQ INTERNATIONAL SCHOOL tahun ajaran {studentRegistration?.registration_year} / {Number(studentRegistration?.registration_year) + 1}. <br />
                    Demikian pengumuman ini disampaikan untuk dapat digunakan sebagai mestinya.
                </span>
                <Ttd ppdbSetting={ppdbSetting} />
                <span className='block mt-6 font-bold'>{ppdbSetting?.verification_notes ?? 'Note : Semua uang pembayaran yang sudah masuk rekening Al Siddiq tidak bisa dikembalikan'}</span>
            </div>
            <img className='absolute bottom-0' src="/footer.png" alt="" />
        </div>
    )
})
