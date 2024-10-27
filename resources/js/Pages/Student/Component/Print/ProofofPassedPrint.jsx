import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Cop from './Cop'
import Ttd from './Ttd'
dayjs.locale('id')

export const ProofofPassedPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration } = props

    return (
        <div className='p-10 text-black font-calibri' ref={ref}>
            {/* cop */}
            <Cop />
            <div className='mb-2'>
                <div className='flex flex-col items-center mt-2 mb-4'>
                    <h4 align="center" className='font-bold'>
                        <u>S U R A T  P E N G U M U M A N</u>
                    </h4>
                    <span>No : 420/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/PPDB.AL-SIDDIQ/{studentRegistration.registration_year}</span>
                </div>
            </div>
            <span>Ketua PPDB Al Siddiq International dengan ini menyatakan bahwa :</span>
            <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />

            <div className='flex justify-center my-3'>
                <div className='w-3/4 p-2 text-center border border-black border-1'>
                    <span className='text-lg font-bold text-red-500'>L U L U S</span>
                </div>
            </div>
            <span>
                Seleksi Sebagai Calon Peserta Didik Sekolah AL SIDDIQ INTERNATIONAL SCHOOL tahun ajaran {dayjs().format('YYYY')}/{dayjs().add(1, 'year').format('YYYY')}. <br />
                Demikian pengumuman ini disampaikan untuk dapat digunakan sebagai mestinya.
            </span>
            <Ttd />
        </div>
    )
})
