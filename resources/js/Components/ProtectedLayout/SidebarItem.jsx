import React from 'react'
import { ArrowDownTrayIcon, Cog6ToothIcon, DocumentArrowUpIcon, DocumentTextIcon, HomeIcon, MegaphoneIcon, PresentationChartLineIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { minimizeSidebarAtom } from '@/Layouts/AuthenticatedLayout'
import { useAtom } from 'jotai'
import { cn } from '@/utils/cn'
import { Link } from '@inertiajs/react'

const SidebarItem = ({ className, ...props }) => {
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)
    const url = window.location
    const { studentRegistration, handlePrint } = props
    const registrationStatus = studentRegistration?.status
    const userType = props?.auth?.user?.user_type;
    const handleClickPrint = () => {
        return registrationStatus !== 'waiting-for-verification' && handlePrint()
    }

    return userType === 'student' ? (
        <ul className={cn(`${minimizeSidebar ? 'w-18' : 'w-64'} py-6 menu gap-1 transition-all duration-30`, className)}>
            <li className={`${minimizeSidebar ? 'w-fit' : 'w-auto'}`}>
                <Link className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student' ? 'bg-base-200' : ''}`} href='/dashboard-student'>
                    <HomeIcon className='size-5' />
                    {!minimizeSidebar && 'Dashboard'}
                </Link>
            </li>
            <li>
                <Link className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/announcement' ? 'bg-base-200' : ''}`} href='/dashboard-student/announcement'>
                    <MegaphoneIcon className='size-5' />
                    {!minimizeSidebar && 'Pengumuman'}
                </Link>
            </li>
            <li>
                <Link className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/profile' ? 'bg-base-200' : ''}`} href='/dashboard-student/profile'>
                    <DocumentTextIcon className='size-5' />
                    {!minimizeSidebar && 'Biodata Pendaftaran'}
                </Link>
            </li>
            <li>
                <div className={`flex items-center py-3 text-base ${registrationStatus !== 'waiting-for-verification' ? 'cursor-pointer' : ''}`} onClick={handleClickPrint}>
                    <PrinterIcon className='size-5' />
                    {!minimizeSidebar && 'Cetak Bukti Pendaftaran'}
                </div>
            </li>
            <li>
                <a className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/download' ? 'bg-base-200' : ''}`} href="/Panduan_PPDB_Online.pdf" target='_blank'>
                    <ArrowDownTrayIcon className='size-5' />
                    {!minimizeSidebar && 'Download Panduan'}
                </a>
            </li>
        </ul>
    ) : <ul className={cn(`${minimizeSidebar ? 'w-18' : 'w-64'} py-6 menu gap-1 transition-all duration-30`, className)}>
        <li className={`${minimizeSidebar ? 'w-fit' : 'w-auto'}`}>
            <Link className={`flex items-center py-3 text-base ${url.pathname === '/dashboard' ? 'bg-base-200' : ''}`} href='/dashboard'>
                <HomeIcon className='size-5' />
                {!minimizeSidebar && 'Dashboard'}
            </Link>
        </li>

        <li>
            <Link className={`flex items-center py-3 text-base ${url.pathname === '/verification-student' ? 'bg-base-200' : ''}`} href='/verification-student'>
                <DocumentTextIcon className='size-5' />
                {!minimizeSidebar && 'Verifikasi'}
            </Link>
        </li>
        <li>
            <a className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/download' ? 'bg-base-200' : ''}`} href="/Panduan_PPDB_Online.pdf" target='_blank'>
                <DocumentArrowUpIcon className='size-5' />
                {!minimizeSidebar && 'Export Formulir'}
            </a>
        </li>
        <li>
            <a className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/download' ? 'bg-base-200' : ''}`} href="/Panduan_PPDB_Online.pdf" target='_blank'>
                <DocumentArrowUpIcon className='size-5' />
                {!minimizeSidebar && 'Export Data LMS'}
            </a>
        </li>
        <li>
            <Link className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/profile' ? 'bg-base-200' : ''}`} href='/dashboard-student/profile'>
                <PresentationChartLineIcon className='size-5' />
                {!minimizeSidebar && 'Statistik Pendaftar'}
            </Link>
        </li>
        <li>
            <Link className={`flex items-center py-3 text-base ${url.pathname === '/ppdb-setting' ? 'bg-base-200' : ''}`} href='/ppdb-setting'>
                <Cog6ToothIcon className='size-5' />
                {!minimizeSidebar && 'Pengaturan PPDB'}
            </Link>
        </li>
    </ul>
}

export default SidebarItem
