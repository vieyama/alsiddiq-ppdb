import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Ttd from './Ttd'
import { getSchoolLevel } from '@/utils/getSchoolLevel'
dayjs.locale('id')

export const ProofofPassedPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, ppdbSetting } = props

    return (
        <div className='text-black relative font-calibri w-[210mm] h-[297mm] border border-black' ref={ref}>
            <img className='absolute top-0' src="/header.png" alt="" />
            <div className='px-10 relative top-[140px]'>
                <div className='mb-5 text-center'>
                    <h4 align="center" className='mt-2 font-bold'>
                        <u>S U R A T  P E N G U M U M A N</u>
                    </h4>
                    <span>No : {studentRegistration?.announcement_number}/ALSIDDIQ/PPDB.AL-SIDDIQ/{studentRegistration?.registration_year}</span>
                </div>
                <span className='pl-8'>Ketua Panitia PPDB Al Siddiq International dengan ini menyatakan bahwa :</span>
                <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />
                <div className='flex justify-center my-3'>
                    <div className='w-3/4 p-2 text-center border border-black border-1'>
                        <span className='text-lg font-bold text-red-500'>L U L U S</span>
                    </div>
                </div>
                <span>
                    Seleksi Sebagai Calon Peserta Didik {getSchoolLevel(student?.level)} AL SIDDIQ INTERNATIONAL SCHOOL Kelas {student.grade} Tahun Ajaran {studentRegistration?.registration_year} / {Number(studentRegistration?.registration_year) + 1}. <br />
                    Demikian pengumuman ini disampaikan untuk dapat digunakan sebagai mestinya.
                </span>
                <Ttd ppdbSetting={ppdbSetting} />
            </div>
            <img className='absolute bottom-0' src="/footer.png" alt="" />
        </div>
    )
})
