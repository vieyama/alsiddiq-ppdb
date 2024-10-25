import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

export const Print = forwardRef((props, ref) => {
    const { student, parents, school, studentRegistration, t } = props

    return (
        <div className='p-10 text-black font-calibri' ref={ref}>
            {/* cop */}
            <div className='flex w-full'>
                <div className='w-[150px]'>
                    <img src="/logo.png" alt="logo2" width={150} />
                </div>
                <div className='w-full'>
                    <div className='flex flex-col leading-7 text-center'>
                        <span className='text-[23px] font-bold'>
                            PANITIA PENERIMAAN PESERTA DIDIK BARU <br /> (PPDB)
                        </span>
                        <span className='text-[30px] font-bold'>AL SIDDIQ INTERNATIONAL</span>
                        <span className='text-[20px] font-bold'>TAHUN PELAJARAN 2024 / 2025</span>
                    </div>
                    <div className='flex flex-col items-center mt-3 leading-5'>
                        <div className='text-[15px] flex flex-col'>
                            <span>Sekretariat : Jl. H. Toha RT 002 RW 006 Jatimakmur Pondok Gede Kota
                                Bekasi</span>
                            <span className='text-[15px] flex flex-wrap items-center justify-center'>
                                <img
                                    src="/telp.jpg"
                                    alt="telp."

                                />{" "}
                                +62 819 4611 8111. Jawa Barat - Indonesia{" "}
                                <img
                                    src="/kode_pos.jpg"
                                    alt="Kode Pos."
                                />{" "}
                                17413
                            </span>
                        </div>
                        <span> Website : https://alsiddiqintl.com/ e-mail : info@alsiddiqintl.com</span>
                    </div>
                </div>
            </div>
            <div className='mt-2 border border-b-[0.3px] border-black' />
            <div className='mt-[2px] border border-b-[0.5px] border-black' />
            <div className='mb-8'>
                <h4 align="center" className='mt-2 mb-4 font-bold'>
                    <u>BUKTI PENDAFTARAN</u>
                </h4>
                <b className='leading-4'>
                    <center>
                        PANITIA PENERIAMAAN PESERTA DIDIK BARU (PPDB) <br />
                        AL SIDDIQ INTERNATIONAL
                        <br />
                        TAHUN PELAJARAN 2024 / 2025
                    </center>
                </b>
            </div>

            <table width="100%" border={0} className='mt-4 leading-5'>
                <tbody>
                    <tr>
                        <td width={200}>NO. PENDAFTARAN</td>
                        <td width={1}>:</td>
                        <td>{studentRegistration.register_number}</td>
                    </tr>
                    <tr>
                        <td>TANGGAL PENDAFTARAN </td>
                        <td>:</td>
                        <td>{dayjs(student.created_at).format('DD MMMM YYYY')}</td>
                    </tr>
                    <tr>
                        <td>TANGGAL CETAK </td>
                        <td>:</td>
                        <td>{dayjs().format('DD MMMM YYYY')}</td>
                    </tr>
                    <tr>
                        <td>NIS</td>
                        <td>:</td>
                        <td>{student.nis}</td>
                    </tr>
                    <tr>
                        <td>NISN</td>
                        <td>:</td>
                        <td>{student.nisn}</td>
                    </tr>
                    <tr>
                        <td>NIK</td>
                        <td>:</td>
                        <td>{student.nik}</td>
                    </tr>
                    <tr>
                        <td>NAMA LENGKAP</td>
                        <td>:</td>
                        <td>{student.fullname}</td>
                    </tr>
                    <tr>
                        <td>JENIS KELAMIN</td>
                        <td>:</td>
                        <td>{student.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}</td>
                    </tr>
                    <tr>
                        <td>TEMPAT, TANGGAL LAHIR</td>
                        <td>:</td>
                        <td>{student.pob}, {dayjs(student.dob).format('DD MMMM YYYY')}</td>
                    </tr>
                    <tr>
                        <td>AGAMA</td>
                        <td>:</td>
                        <td className='capitalize'>{student.religion}</td>
                    </tr>
                    <tr>
                        <td>NAMA ORANG TUA /WALI</td>
                        <td>:</td>
                        <td />
                    </tr>
                    {parents.map((item, key) => (
                        <tr key={key}>
                            <td className='pl-[55px] uppercase'>{t(item.type)}</td>
                            <td>:</td>
                            <td>{item.fullname}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>NO. HANDPHONE (HP)</td>
                        <td>:</td>
                        <td>{student.phone}</td>
                    </tr>
                    <tr>
                        <td>ASAL SEKOLAH</td>
                        <td>:</td>
                        <td>{school.school_name}</td>
                    </tr>
                </tbody>
            </table>

            <div className='flex justify-end w-full mt-6'>
                <div className='flex flex-col text-start'>
                    <span>Kota Bekasi, {dayjs().format('DD MMMM YYYY')}<br />Ketua Panitia PPDB,</span>
                    <b className='mt-20'>
                        <u>Abdullah Haris, Lc. M.Pd.</u>
                    </b>
                </div>
            </div>
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
