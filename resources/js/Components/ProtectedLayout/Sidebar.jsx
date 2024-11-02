import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import SidebarItem from './SidebarItem'
import { useReactToPrint } from 'react-to-print'
import { ProofofRegistrationPrint } from '@/Pages/Student/Component/Print/ProofofRegistrationPrint'
import { minimizeSidebarAtom } from '@/atom/sidebar'

const ProtectedSidebar = (props) => {
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)
    const { student, parents, school, studentRegistration, auth, ppdbSetting } = props

    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef
    });

    return (
        <div className={`bg-white fixed min-h-[calc(100vh-65px)] z-10 shadow-md transition-all duration-300 hidden md:block ${minimizeSidebar ? 'w-18' : 'w-auto'}`}>
            <SidebarItem {...props} handlePrint={handlePrint} />

            {auth?.user?.user_type === 'student' && <div className='hidden'>
                <ProofofRegistrationPrint ref={contentRef} student={student} parents={parents} school={school} studentRegistration={studentRegistration} ppdbSetting={ppdbSetting} />
            </div>}
        </div>
    )
}

export default ProtectedSidebar
