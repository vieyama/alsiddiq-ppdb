import ProtectedNavbar from '@/Components/ProtectedLayout/Navbar';
import ProtectedSidebar from '@/Components/ProtectedLayout/Sidebar';
import { usePage } from '@inertiajs/react';
import { atom, useAtom } from 'jotai';

export const minimizeSidebarAtom = atom(false)

export default function Authenticated({ children, handlePrint }) {
    const user = usePage().props.auth.user;
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)
    console.log(minimizeSidebar);

    return (
        <div className="min-h-screen bg-gray-100">
            <ProtectedNavbar user={user} />
            <div className='relative flex top-16'>
                <ProtectedSidebar {...usePage().props} handlePrint={handlePrint} />
                <main className={`w-full ${minimizeSidebar ? 'ml-16' : 'md:ml-64'}`}>
                    <div className="py-8 bg-gray-100">
                        <div className="max-w-full mx-5 sm:mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
