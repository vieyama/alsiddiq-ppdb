import React from 'react'
import { ArrowDownTrayIcon, DocumentTextIcon, HomeIcon, MegaphoneIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { minimizeSidebarAtom } from '@/Layouts/AuthenticatedLayout'
import { useAtom } from 'jotai'
import { cn } from '@/utils/cn'
import { Link } from '@inertiajs/react'

const SidebarItem = ({ className, ...props }) => {
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)
    const url = window.location
    const { handlePrint, studentRegistration } = props
    const registrationStatus = studentRegistration?.status

    const handleClickPrint = () => {
        return registrationStatus !== 'waiting-for-verification' && handlePrint()
    }

    return (
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
                <a className={`flex items-center py-3 text-base ${url.pathname === '/dashboard-student/download' ? 'bg-base-200' : ''}`} href="/FORMULIR-PENDAFTARAN.docx">
                    <ArrowDownTrayIcon className='size-5' />
                    {!minimizeSidebar && 'Download Panduan'}
                </a>
            </li>
        </ul>
    )
}

export default SidebarItem
