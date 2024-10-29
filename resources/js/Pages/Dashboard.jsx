import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import TextInput from '@/Components/TextInput';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const totalUserThisYear = usePage().props?.totalUserThisYear;
    const totalUserThisYearPassed = usePage().props?.totalUserThisYearPassed;
    const monthlyRegistrationData = usePage().props?.monthlyRegistrationData;
    const ppdbSetting = usePage().props?.ppdbSetting;

    const switchRegistrationStatus = () => {
        router.patch(`/ppdb-setting/update/${ppdbSetting.id}`, {
            status: ppdbSetting.status === 'active' ? 'close' : 'active',
            ...(ppdbSetting.status === 'close' && { registration_year: Number(ppdbSetting.registration_year) + 1 })
        })
    }

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Jumlah data Pendaftaran',
                data: monthlyRegistrationData?.flatMap(item => item.total) ?? [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grafik Statistik Pendaftaran Siswa Tahun 2024 / 2025',
            },
        },
    };

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Dashboard</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <div role="alert" className="p-4 text-center bg-primary">
                <span className='text-lg font-normal text-white'>Selamat Datang, <b className='uppercase'>{user.name}</b></span>
            </div>

            <div className="flex flex-col w-full mt-5 rounded-md shadow-lg md:flex-row stats">
                <div className="stat place-items-center">
                    <div className="stat-value">{totalUserThisYear ?? 0}</div>
                    <div className="stat-desc">Calon Siswa yang mendaftar Tahun 2024</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-value">{totalUserThisYearPassed ?? 0}</div>
                    <div className="stat-desc">Calon Siswa yang Lulus PPDB Tahun 2024</div>
                </div>
            </div>
<TextInput type="text" />
            <div className='mt-6'>
                <div role="alert" className="alert">
                    <DocumentChartBarIcon className='size-6' />
                    <span>Status Pendaftaran PPDB Online <b className={`p-1 text-white ${ppdbSetting.status === 'active' ? 'bg-primary' : 'bg-orange-300'}`}>{ppdbSetting.status === 'active' ? 'masih dibuka' : 'telah ditutup'}.</b> Terakhir diubah {dayjs(ppdbSetting?.updated_at).format('DD-MM-YYYY H:m:ss')}.</span>
                    <div>
                        <button onClick={switchRegistrationStatus} className="btn btn-sm btn-primary">{ppdbSetting.status === 'active' ? 'Tutup' : 'Buka'} Pendaftaran</button>
                    </div>
                </div>
            </div>

            <div className='p-4 mt-6 shadow-lg'>
                <Line data={data} options={options} className='h-60' height={85} />
            </div>
        </AuthenticatedLayout>
    );
}
