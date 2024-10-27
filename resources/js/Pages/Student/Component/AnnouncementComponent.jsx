import WhatsAppIcon from '@/Components/SVG/WhatsAppIcon'
import { PrinterIcon } from '@heroicons/react/24/solid'

export const AnnouncementComponent = ({ studentRegistration, user, onClickPrint }) => {
    switch (studentRegistration.status) {
        case 'waiting-for-verification':
            return <>
                <p className='text-lg'>Pendaftaran <b>{user.name}</b> <span className='font-bold text-white bg-primary'>Belum di-VERIFIKASI</span> Sebagai Calon Peserta Didik Baru, Silahkan Transfer Biaya Pendaftaran dan Konfirmasi ke Admin Sekolah, dibawah ini :</p>
                <a className="items-center pr-5 m-auto shadow-md card-actions w-fit" href={`https://wa.me/6281946118111?text=Assalamu%20alaikum%20Admin%20Sekolah%20saya%20mau%20konfirmasi%20Pendaftaran%20No%20Pendaftaran%20${studentRegistration.register_number}`} target="_blank">
                    <WhatsAppIcon />
                    <span>Hubungi Kami Melalui <br /><b className='text-secondaryGreen'>WhatsApp</b></span>
                </a>
            </>
        case 'verified':
            return <div className='flex flex-col items-center'><p className='text-lg'>Selamat Pendaftaran Siswa Testing <span className='font-bold text-white bg-primary'>sudah di-VERIFIKASI</span> Sebagai Calon Peserta Didik Baru, Silahkan Lihat Pengumuman untuk Jadwal Test & Wawancara.</p>
                <button className="text-white w-fit btn btn-active btn-primary" onClick={() => onClickPrint('verified')}><PrinterIcon className='size-4' /> Cetak Jadwal Test & Wawancara</button>
            </div>
        case 'passed':
            return <div className='flex flex-col items-center'><p className='text-lg'>Selamat <b>{user.name}</b> <span className='font-bold text-white bg-primary'>LULUS</span> Seleksi Sebagai Calon Peserta Didik Baru, Silahkan Cetak Surat Pengumuman Sebagai Bukti Lulus Seleksi.</p><button className="text-white w-fit btn btn-active btn-primary" onClick={() => onClickPrint('passed')}><PrinterIcon className='size-4' /> Cetak Bukti Lulus</button></div>
        case 'not_passed':
            return <><p className='text-lg'>Mohon maaf <b>{user.name}</b>, anda dinyatakan <span className='font-bold text-white bg-red-500'>TIDAK LULUS</span> Seleksi Sebagai Calon Peserta Didik Baru.</p></>
        default:
            break;
    }
}
