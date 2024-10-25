import { minimizeSidebarAtom } from '@/Layouts/AuthenticatedLayout'
import { useAtom } from 'jotai'
import React from 'react'
import SidebarItem from './SidebarItem'

const ProtectedSidebar = (props) => {
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)

    return (
        <div className={`bg-white fixed min-h-[calc(100vh-65px)] transition-all duration-300 hidden md:block ${minimizeSidebar ? 'w-18' : 'w-auto'}`}>
            <SidebarItem {...props} />
        </div>
    )
}

export default ProtectedSidebar
