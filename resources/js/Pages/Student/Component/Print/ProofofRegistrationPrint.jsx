import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Ttd from './Ttd'
dayjs.locale('id')

export const ProofofRegistrationPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, ppdbSetting } = props

    return (
        <div className='text-black relative font-calibri w-[210mm] h-[297mm]' ref={ref}>
            <img className='absolute top-0' src="/header.png" alt="" />
            <div className='px-10 relative top-[140px]'>
                <div className='mb-5'>
                    <b className='leading-6'>
                        <center>
                            BUKTI PENDAFTARAN <br />
                            PANITIA PENERIAMAAN PESERTA DIDIK BARU (PPDB) <br />
                            AL SIDDIQ INTERNATIONAL <br />
                            TAHUN PELAJARAN {studentRegistration?.registration_year} / {Number(studentRegistration?.registration_year) + 1}
                        </center>
                    </b>
                </div>

                <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />
                <Ttd ppdbSetting={ppdbSetting} />

                <div className='flex-1 mt-8'>
                    <b>
                        <u>Siapkan Berkas Berikut Ketika anda melakukan verifikasi :</u>
                    </b>
                    <table width="100%" border={0} style={{ marginLeft: 5 }}>
                        <tbody>
                            <tr>
                                <td>Cetak bukti pendaftaran</td>
                                <td className='w-auto text-end'>: 1 lembar</td>
                            </tr>
                            <tr>
                                <td>Pas foto berwarna ukuran 3 x 4</td>
                                <td className='w-auto text-end'>: 3 lembar</td>
                            </tr>
                            <tr>
                                <td>
                                    Print out ASLI NISN dari web <i>http://nisn.data.kemdikbud.go.id</i>{" "}
                                    Dilegalisir
                                </td>
                                <td className='w-auto text-end'>: 1 lembar</td>
                            </tr>

                            <tr>
                                <td>Foto copy Kartu Keluarga KK</td>
                                <td className='w-auto text-end'>: 1 lembar</td>
                            </tr>
                            <tr>
                                <td className='w-[520px]' colSpan={1}>
                                    Semua berkas dimasukan kedalam map, laki–laki warna merah dan
                                    perempuan warna biru
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <img className='absolute bottom-0' src="/footer.png" alt="" />
        </div>
    )
})
