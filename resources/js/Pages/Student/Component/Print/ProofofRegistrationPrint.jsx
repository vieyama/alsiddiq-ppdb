import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import TableStudent from './TableStudent'
import Cop from './Cop'
import Ttd from './Ttd'
dayjs.locale('id')

export const ProofofRegistrationPrint = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration } = props

    return (
        <div className='p-10 text-black font-calibri' ref={ref}>
            {/* cop */}
            <Cop />
            <div className='mb-8'>
                <h4 align="center" className='mt-2 mb-4 font-bold'>
                    <u>BUKTI PENDAFTARAN</u>
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

            <TableStudent parents={parents} studentRegistration={studentRegistration} student={student} school={school} />

            <Ttd />

            <div className='flex-1 mt-6'>
                <b>
                    <u>Siapkan Berkas Berikut Ketika anda melakukan verifikasi :</u>
                </b>
                <table width="100%" border={0} style={{ marginLeft: 5 }}>
                    <tbody>
                        <tr>
                            <td width={1}>1.</td>
                            <td>Cetak bukti pendaftaran</td>
                            <td width={1}>:</td>
                            <td>1 lembar</td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Pas foto berwarna ukuran 3 x 4</td>
                            <td>:</td>
                            <td>3 lembar</td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td>
                                Print out ASLI NISN dari web <i>http://nisn.data.kemdikbud.go.id</i>{" "}
                                Dilegalisir
                            </td>
                            <td>:</td>
                            <td>1 lembar</td>
                        </tr>

                        <tr>
                            <td>4.</td>
                            <td>Foto copy Kartu Keluarga KK</td>
                            <td>:</td>
                            <td>1 lembar</td>
                        </tr>
                        <tr>
                            <td valign="top">5.</td>
                            <td colSpan={3}>
                                Semua berkas dimasukan kedalam map, laki–laki warna merah dan
                                perempuan warna biru
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
})
