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
import { useMemo, useState } from 'react';
import { yearsOptions } from '@/utils/yearOptions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Statistic() {
    const ppdbSetting = usePage().props.ppdbSetting;
    const totalUserPerYear = usePage().props?.totalUserPerYear;
    const totalUserPerYearPassed = usePage().props?.totalUserPerYearPassed;
    const totalUserPerYearVerified = usePage().props?.totalUserPerYearVerified;
    const totalUserPerYearNotPassed = usePage().props?.totalUserPerYearNotPassed;
    const monthlyTotalData = usePage().props?.monthlyTotalData;
    const monthlyVerifiedData = usePage().props?.monthlyVerifiedData;
    const monthlyPassedData = usePage().props?.monthlyPassedData;
    const monthlyNotPassedData = usePage().props?.monthlyNotPassedData;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
    const dataTotal = {
        labels: months,
        datasets: [
            {
                label: 'Jumlah data Pendaftaran',
                data: monthlyTotalData?.flatMap(item => item.total) ?? [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const dataVerified = {
        labels: months,
        datasets: [
            {
                label: 'Jumlah data Pendaftaran',
                data: monthlyVerifiedData?.flatMap(item => item.total) ?? [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const dataPassed = {
        labels: months,
        datasets: [
            {
                label: 'Jumlah data Pendaftaran',
                data: monthlyPassedData?.flatMap(item => item.total) ?? [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const dataNotPassed = {
        labels: months,
        datasets: [
            {
                label: 'Jumlah data Pendaftaran',
                data: monthlyNotPassedData?.flatMap(item => item.total) ?? [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const [selectedTab, setSelectedTab] = useState(0)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const year = urlParams.get('year')

    const displayYear = year ?? ppdbSetting?.registration_year

    const getTitle = useMemo(() => {
        switch (selectedTab) {
            case 0:
                return `Grafik Statistik Pendaftaran Tahun ${displayYear} / ${Number(displayYear) + 1}`
            case 1:
                return `Grafik Statistik Data Pendaftar Diverifikasi Tahun ${displayYear} / ${Number(displayYear) + 1}`
            case 2:
                return `Grafik Statistik Data Pendaftar Diterima Tahun ${displayYear} / ${Number(displayYear) + 1}`
            case 3:
                return `Grafik Statistik Data Pendaftar Tidak Diterima Tahun ${displayYear} / ${Number(displayYear) + 1}`
            default:
                return `Grafik Statistik Pendaftaran Tahun Tahun ${displayYear} / ${Number(displayYear) + 1}`
        }
    }, [selectedTab])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: getTitle,
            },
        },
    };

    const handleFilterYear = (event) => {
        const url = new URL(window.location.href);
        url.searchParams.append('year', event.target.value);
        router.get(url.pathname + url.search)
    }

    const getDataChart = useMemo(() => {
        switch (selectedTab) {
            case 0:
                return dataTotal
            case 1:
                return dataVerified
            case 2:
                return dataPassed
            case 3:
                return dataNotPassed
            default:
                return dataTotal
        }
    }, [selectedTab])

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Statistic</title>
                <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
                <link rel="icon" type="image/svg+xml" href="/logo-white.png" />
            </Head>

            <div className='flex justify-end w-full mb-4'>
                <select className="min-h-10 select select-bordered" defaultValue={year} onChange={handleFilterYear}>
                    {yearsOptions(Number(ppdbSetting.registration_year)).map((item, key) => (
                        <option key={key} value={item}>Tahun {item}</option>
                    ))}
                </select>
            </div>

            <div role="tablist" className="tabs tabs-boxed">
                <a role="tab" onClick={() => setSelectedTab(0)} className={`tab ${selectedTab === 0 ? 'tab-active' : ''}`}>Pendaftar <div className='ml-1 badge badge-neutral'>{totalUserPerYear}</div></a>
                <a role="tab" onClick={() => setSelectedTab(1)} className={`tab ${selectedTab === 1 ? 'tab-active' : ''}`}>Pendaftar Diverifikasi <div className='ml-1 badge badge-secondary'>{totalUserPerYearVerified}</div></a>
                <a role="tab" onClick={() => setSelectedTab(2)} className={`tab ${selectedTab === 2 ? 'tab-active' : ''}`}>Pendaftar Diterima<div className='ml-1 badge badge-primary'>{totalUserPerYearPassed}</div></a>
                <a role="tab" onClick={() => setSelectedTab(3)} className={`tab ${selectedTab === 3 ? 'tab-active' : ''}`}>Pendaftar Tidak Diterima <div className='ml-1 badge badge-accent'>{totalUserPerYearNotPassed}</div></a>
            </div>

            <div className='p-4 mt-6 shadow-lg'>
                <Line data={getDataChart} options={options} height={110} />
            </div>
        </AuthenticatedLayout>
    );
}
