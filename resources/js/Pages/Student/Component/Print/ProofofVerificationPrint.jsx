import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Cop from './Cop'
import Ttd from './Ttd'
dayjs.locale('id')

export const ProofofVerificationPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration } = props

    return (
        <div className='p-10 text-black font-calibri' ref={ref}>
            {/* cop */}
            <Cop />
            <div className='mb-2'>
                <h4 align="center" className='mt-2 mb-4 font-bold'>
                    <u>BUKTI VERIFIKASI</u>
                </h4>
                <b className='leading-4'>
                    <center>
                        PANITIA PENERIAMAAN PESERTA DIDIK BARU (PPDB) <br />
                        AL SIDDIQ INTERNATIONAL
                        <br />
                        TAHUN PELAJARAN {dayjs().format('YYYY')}/{dayjs().add(1, 'year').format('YYYY')}
                    </center>
                </b>
            </div>
            <span>Ketua Panitia PPDB Al Siddiq International dengan ini menyatakan bahwa :</span>
            <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />

            <div className='flex justify-center my-3'>
                <div className='w-3/4 p-2 text-center border border-black border-1'>
                    <span className='text-lg font-bold text-red-500'>SUDAH VERIFIKASI</span>
                </div>
            </div>
            <span>
                Sebagai Calon Peserta Didik Sekolah AL SIDDIQ INTERNATIONAL SCHOOL tahun ajaran {dayjs().format('YYYY')}/{dayjs().add(1, 'year').format('YYYY')}. <br />
                Demikian pengumuman ini disampaikan untuk dapat digunakan sebagai mestinya.
            </span>
            <Ttd />
            <span className='block mt-4 font-bold'>Note : Semua uang pembayaran yang sudah masuk rekening Al Siddiq tidak bisa dikembalikan</span>

        </div>
    )
})
