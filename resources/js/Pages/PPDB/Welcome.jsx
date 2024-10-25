import PpdbLayout from '@/Layouts/PpdbLayout'
import { rupiahFormatter } from '@/utils/rupiahFormatter';
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import LoginModal from './components/LoginModal';
import { UsersIcon, DocumentTextIcon, ArrowDownTrayIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import TocModal from './components/TocModal';

const Welcome = () => {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;

    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
    const [isOpenModalTOC, setIsOpenModalTOC] = useState(false)

    const flowData = [
        { color: '#72bf78', image: '/start.webp' },
        { color: '#fd8b51', image: '/registration.webp' },
        { color: '#027296', image: '/test.webp' },
        { color: '#239799', image: '/announcement.webp' },
        { color: '#de9600', image: 'payment.webp' }
    ]

    const prices = [
        { name: 'tk', price: 600000, icon: '/playground.png' },
        { name: 'sd', price: 750000, icon: '/school-bag.png' },
        { name: 'smp', price: 750000, icon: '/stationery.png' }
    ]

    return (
        <PpdbLayout user={user}>
            <Head title="PPDB ONLINE" />
            {/* hero section */}
            <div
                className="min-h-screen hero"
                style={{
                    backgroundImage: "url('/bg_header.jpeg')",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-center hero-content text-neutral-content">
                    <div className="flex flex-col items-center max-w-3xl gap-9">
                        <img src="/logo-white.png" alt="" className="w-28" />
                        <h1 className="mb-5 text-3xl font-bold md:text-5xl">{t('title')}</h1>
                        <div className="flex flex-col gap-3 md:flex-row">
                            <a href="/FORMULIR-PENDAFTARAN.docx" className="text-white border-none outline-none btn bg-primary">
                                <ArrowDownTrayIcon className="size-6" />
                                {t('downloadGuidline')}
                            </a>
                            {!user?.user_type &&
                                <>
                                    <button onClick={() => setIsOpenModalTOC(true)} className="text-white border-none outline-none btn bg-primary">
                                        <DocumentTextIcon className="size-6" />
                                        {t('register')}
                                    </button>
                                    <button className="text-white border-none outline-none btn bg-primary" onClick={() => setIsOpenModalLogin(true)}>
                                        <UsersIcon className="size-6" />
                                        {t('studentLogin')}
                                    </button>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* about section */}
            <div className="flex flex-col gap-8 p-16 text-center md:p-20 lg:p-48" id="information">
                <div className="relative flex items-center justify-center">
                    <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                    <span className="z-10 text-4xl font-bold md:text-5xl">{t('ppdbInformationTitle')}</span>
                </div>
                <span className="z-10">
                    {t('ppdbInformationTitleDesc1')}
                    <br />
                    <br />
                    {t('ppdbInformationTitleDesc2')}
                </span>
            </div>

            {/* flow section */}
            <div className="flex flex-col items-center gap-8 p-16 text-center md:p-20 lg:p-28 bg-[url('/background.webp')] bg-cover bg-center" id="flow">
                <div className="relative flex items-center justify-center">
                    <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                    <span className="z-10 text-4xl font-bold md:text-5xl">{t('registrationFlow')}</span>
                </div>

                <div className="flex flex-col flex-wrap justify-center gap-9 md:flex-row max-w-7xl">
                    {flowData.map((item, index) => (
                        <div className="flex flex-col items-center gap-2 top-9" key={index}>
                            <img src={item.image} alt="" className="w-40" />
                            <div className={`w-12 p-2 bg-[${item.color}] rounded-full`}>
                                <span className="text-2xl text-white">{index + 1}</span>
                            </div>
                            <span className="block w-56 text-xl font-semibold">{t('step' + (index + 1))}</span>
                        </div>
                    ))}
                </div>

                <div className="px-0 md:px-28">
                    <div className="relative flex items-center justify-center mt-20 mb-5">
                        <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                        <span className="z-10 text-4xl font-bold md:text-2xl">{t('procedure')}</span>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <tbody>
                                    {t('registrationProcedure', { returnObjects: true }).map((item, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* price section */}
            <div className="flex flex-col gap-8 p-16 text-center md:p-20 lg:p-48" id="price">
                <div className="relative flex items-center justify-center">
                    <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                    <span className="z-10 text-4xl font-bold md:text-5xl">{t('price')}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5">

                    {prices.map((item, index) => (
                        <div className="shadow-xl card bg-base-100 w-96" key={index}>
                            <figure className="px-10 pt-10">
                                <img
                                    src={item.icon}
                                    alt="Shoes"
                                    className="w-20 rounded-xl" />
                            </figure>
                            <div className="items-center text-center card-body">
                                <h2 className="text-lg font-semibold">{t(item.name)}</h2>
                                <p>{rupiahFormatter(item.price)},-</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">

                    <div className="shadow-xl card bg-base-100 w-96">
                        <figure className="px-10 pt-10">
                            <img
                                src="/bsi-logo.png"
                                alt="Logo BSI"
                                className="rounded-xl" />
                        </figure>
                        <div className="items-center text-center card-body">
                            <h2 className="text-lg font-semibold">{t('registrationAccount')}</h2>
                            <p>{t('title')}<br />
                                Bank BSI No. 9999 211 213</p>
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={() => { navigator.clipboard.writeText('9999211213') }}>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* contact section */}
            <div className="flex flex-col items-center gap-8 p-16 text-center md:p-20 lg:p-28 bg-[url('/background.webp')] bg-cover bg-center" id="contact">
                <div className="relative flex items-center justify-center">
                    <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                    <span className="z-10 text-4xl font-bold md:text-5xl">{t('contact')}</span>
                </div>

                <div className="px-0 md:px-28">
                    <h5 className="text-2xl">
                        {t('title')}
                    </h5>
                    <span className="text-lg">
                        Jl. H. Toha RT 002 RW 006 Jatimakmur Pondok Gede Kota Bekasi Jawa Barat - Indonesia
                    </span>
                    <div className="flex justify-center gap-10 mt-5">
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="size-6" />
                            <span>+62 819 4611 8111</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <EnvelopeIcon className="size-6" />
                            <span>info@alsiddiqintl.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GlobeAltIcon className="size-6" />
                            <span>alsiddiqintl.com</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63459.211115398!2d106.90396314159662!3d-6.237257200191094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d0e24e40587%3A0xe7e9889c76be379!2sAl%20Siddiq%20International%20School!5e0!3m2!1sen!2sid!4v1728311014007!5m2!1sen!2sid" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {isOpenModalLogin ? <LoginModal isOpen={isOpenModalLogin} onClose={() => setIsOpenModalLogin(false)} /> : null}
            {isOpenModalTOC ? <TocModal isOpen={isOpenModalTOC} onClose={() => setIsOpenModalTOC(false)} /> : null}

        </PpdbLayout>
    )
}

export default Welcome
