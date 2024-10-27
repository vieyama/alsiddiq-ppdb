import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const Navbar = ({ isFixed, user = null }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language ?? 'id'
    const pathname = window.location.pathname
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true); // If scrolled more than 50px
            } else {
                setIsScrolled(false); // When at the top
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleChangeLanguage = () => {
        i18n.changeLanguage(currentLanguage === 'id' ? 'en' : 'id')
    }

    function scrollToElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={`px-5 lg:px-2 xl:px-10 text-white fixed top-0 navbar z-50 w-full transition-all duration-300 ${isScrolled || isFixed ? 'h-16 shadow-lg bg-primary' : 'h-20 bg-transparent'
            }`}>
            <div className="items-baseline flex-1">
                <a className="flex items-center gap-2 cursor-pointer" href="/">
                    <img src="/logo-white.png" alt="" className={`transition-all duration-30 ${isScrolled || isFixed ? 'w-9' : 'w-11'
                        }`} />
                    <span className={`select-none transition-all hidden md:block w-64 duration-300 ${isScrolled || isFixed ? 'text-base leading-5' : 'text-lg leading-6'
                        } text-left`}>{t('title')}</span>
                </a>
            </div>
            {pathname === '/' ? (
                <>
                    {/* menu for mobile */}
                    <div className="lg:hidden dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-5 h-5 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow text-black">
                            <li>
                                <a onClick={() => scrollToElement('information')}>
                                    {t('information')}
                                </a>
                            </li>
                            <li>
                                <a onClick={() => scrollToElement('flow')}>
                                    {t('flow')}
                                </a>
                            </li>
                            <li>
                                <a onClick={() => scrollToElement('price')}>
                                    {t('price')}
                                </a>
                            </li>
                            <li>
                                <a onClick={() => scrollToElement('contact')}>
                                    {t('contact')}
                                </a>
                            </li>
                            {user &&
                                <li>
                                    <a href="/dashboard-student">
                                        Dashboard
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>

                    {/* menu for desktop */}
                    <ul className="hidden text-base bg-transparent menu lg:contents">
                        <li>
                            <a onClick={() => scrollToElement('information')}>
                                {t('information')}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => scrollToElement('flow')}>
                                {t('flow')}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => scrollToElement('price')}>

                                {t('price')}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => scrollToElement('contact')}>

                                {t('contact')}
                            </a>
                        </li>
                        {user &&
                            <li>
                                <a href="/dashboard-student">
                                    Dashboard
                                </a>
                            </li>
                        }
                    </ul>
                </>
            ) : null}

            <select className="w-auto max-w-xs text-base bg-transparent select md:hidden" value={currentLanguage} onChange={handleChangeLanguage}>
                <option value="id">ID</option>
                <option value="en">EN</option>
            </select>
            <select className="hidden w-auto max-w-xs text-base bg-transparent select md:block" value={currentLanguage} onChange={handleChangeLanguage}>
                <option value="id">Indonesia</option>
                <option value="en">English</option>
            </select>
        </div>
    )
}

export default Navbar
