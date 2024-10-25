import WhatsAppIcon from '@/Components/SVG/WhatsAppIcon'
import { Link } from '@inertiajs/react'
import React from 'react'

export const AnnouncementComponent = ({ studentRegistration, user }) => {
    switch (studentRegistration.status) {
        case 'waiting-for-verification':
            return <>
                <p className='text-lg'>Pendaftaran <b>{user.name}</b> Belum <span className='font-bold text-white bg-primary'>di-VERIFIKASI</span> Sebagai Calon Peserta Didik Baru, Silahkan Transfer Biaya Pendaftaran dan Konfirmasi ke Admin Sekolah, dibawah ini :</p>
                <a className="items-center pr-5 m-auto shadow-md card-actions w-fit" href='https://wa.me/6281946118111' target="_blank">
                    <WhatsAppIcon />
                    <span>Hubungi Kami Melalui <br /><b className='text-secondaryGreen'>WhatsApp</b></span>
                </a>
            </>
        case 'verified':
            return <><p className='text-lg'>Pendaftaran <b>{user.name}</b> berhasil <span className='font-bold text-white bg-primary'>di-VERIFIKASI</span> Sebagai Calon Peserta Didik Baru, Silahkan Lengkapi Data Diri Terlebih Dahulu di Menu <Link className='font-semibold text-red-600' href="/dashboard-student/profile">Biodata Pendaftaran</Link></p></>
        case 'passed':
            return <><p className='text-lg'>Selamat <b>{user.name}</b> <span className='font-bold text-white bg-primary'>LULUS</span> Seleksi Sebagai Calon Peserta Didik Baru, Silahkan Cetak Surat Pengumuman Sebagai Bukti Lulus Seleksi</p></>
        case 'not_passed':
            return <><p className='text-lg'>Mohon maaf <b>{user.name}</b>, anda dinyatakan <span className='font-bold text-white bg-red-500'>TIDAK LULUS</span> Seleksi Sebagai Calon Peserta Didik Baru.</p></>
        default:
            break;
    }
}
