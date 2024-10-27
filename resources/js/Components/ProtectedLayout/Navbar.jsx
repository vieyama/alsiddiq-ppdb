import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { atom, useAtom } from 'jotai';
import { minimizeSidebarAtom } from '@/Layouts/AuthenticatedLayout';
import SidebarItem from './SidebarItem';

const ProtectedNavbar = ({ user }) => {
    const [minimizeSidebar, setMinimize] = useAtom(minimizeSidebarAtom)
    const { t } = useTranslation()
    return (
        <div className="fixed z-[1] px-5 navbar bg-primary drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="flex-1">
                <a className="flex items-center gap-2 cursor-pointer" href="/">
                    <img src="/logo-white.png" alt="" className="w-10" />
                    <span className="hidden font-semibold leading-5 text-white select-none sm:block w-44">{t('title')}</span>
                </a>
                <div className="flex-none ml-3">
                    <label htmlFor="my-drawer" aria-label="open sidebar" className="contents md:hidden btn btn-square btn-ghost">
                        <Bars3Icon className='text-white size-7' />
                    </label>
                    <button onClick={() => setMinimize(!minimizeSidebar)} aria-label="open sidebar" className="hidden md:contents btn btn-square btn-ghost">
                        <Bars3Icon className='text-white size-7' />
                    </button>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className='flex items-center gap-3'>
                        <span className='font-normal text-white'>{user.name}</span>
                        <div className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photo ? `/uploads/${user.photo}` : "/user.png"} />
                            </div>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="z-10 p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link className='py-2' href="/profile">Profile</Link></li>
                        <li><Link className='py-2' href={route('logout')} method="post" as="button">Logout</Link></li>
                    </ul>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <SidebarItem className="h-full bg-white" />
            </div>
        </div>
    )
}

export default ProtectedNavbar
