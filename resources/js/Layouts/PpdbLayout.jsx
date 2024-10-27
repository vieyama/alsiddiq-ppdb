import Navbar from '@/Components/Navbar'
import WhatsAppIcon from '@/Components/SVG/WhatsAppIcon';
import React from 'react'
import { useTranslation } from 'react-i18next';

const PpdbLayout = ({ children, isFixed = false, user = null }) => {
    const { t } = useTranslation();

    return (
        <div className="relative font-poppins">
            <Navbar isFixed={isFixed} user={user} />

            <div className='min-h-[83.1vh]'>
                {children}
            </div>

            <footer className="p-4 footer footer-center bg-primary text-base-content">
                <aside>
                    <p>Copyright © {t('title')} 2024 | All Rights Reserved.</p>
                </aside>
            </footer>

            <div className="fixed bottom-0 right-0 flex items-end justify-end w-24 h-24 p-2 group">
                <a href="https://wa.me/6281946118111" target="_blank" className="absolute z-50 flex items-center justify-center shadow-xl cursor-pointer">
                    <WhatsAppIcon />
                </a>
            </div>
        </div>
    )
}

export default PpdbLayout
