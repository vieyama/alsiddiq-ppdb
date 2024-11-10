import { minimizeSidebarAtom } from '@/atom/sidebar';
import ProtectedNavbar from '@/Components/ProtectedLayout/Navbar';
import ProtectedSidebar from '@/Components/ProtectedLayout/Sidebar';
import { usePage } from '@inertiajs/react';
import { useAtom } from 'jotai';

export default function Authenticated({ children, handlePrint }) {
    const user = usePage().props.auth.user;
    const [minimizeSidebar] = useAtom(minimizeSidebarAtom)

    return (
        <div className="min-h-screen overflow-hidden bg-gray-100">
            <ProtectedNavbar user={user} />
            <div className='relative flex top-16'>
                <ProtectedSidebar {...usePage().props} handlePrint={handlePrint} />
                <main className={`w-full overflow-y-auto overflow-x-hidden ${minimizeSidebar ? 'ml-16' : 'md:ml-64'}`}>
                    <div className="py-6 bg-gray-100">
                        <div className="max-w-full mx-5 sm:mx-auto sm:px-6 lg:px-6 pb-[65px]">
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
