import React from 'react'
import PpdbLayout from '@/Layouts/PpdbLayout'
import { router, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';
import { atomWithStorage } from 'jotai/utils'
import First from './components/Form/Step/First';
import { useAtom } from 'jotai';
import Second from './components/Form/Step/Second';
import Third from './components/Form/Step/Third';
import Fourth from './components/Form/Step/Fourth';
import Head from '@/Components/Head';

const registerDataAtom = atomWithStorage('registerData', {
    studentData: null,
    parentData: null,
    previousSchoolData: null
})

const Register = () => {
    const queryString = window.location.search;
    const csrfToken = usePage().props.csrf_token;
    const urlParams = new URLSearchParams(queryString);
    const { t } = useTranslation();
    const [values, setValues] = useAtom(registerDataAtom)
    const step = urlParams.get('step') ?? '1'

    const handleNext = (data) => {
        setValues({ ...values, ...data });
        router.get(`/ppdb/register?step=${Number(step) + 1}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/ppdb/store", values, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            onSuccess: () => {
                setValues({
                    studentData: null,
                    parentData: null,
                    previousSchoolData: null
                })
            }
        });
    }

    return (
        <PpdbLayout isFixed>
            <Head title="REGISTER PPDB ONLINE" />

            {/* about section */}
            <div className="flex flex-col gap-8 text-center mt-28" id="information">
                <div className="relative flex items-center justify-center">
                    <span className="absolute font-static top-[-50px] text-[#e3eaf0] text-[100px]">Siddiq</span>
                    <span className="z-10 text-2xl font-bold md:text-4xl">{t('title')}</span>
                </div>
                <div className="flex flex-col gap-10">
                    <ul className="steps">
                        <li className={`text-xs sm:text-[16px] sm:leading-8 step ${step === '1' ? 'step-primary' : ''}`}>{t('studentData')}</li>
                        <li className={`text-xs sm:text-[16px] sm:leading-8 step ${step === '2' ? 'step-primary' : ''}`}>{t('parentData')}</li>
                        <li className={`text-xs sm:text-[16px] sm:leading-8 step ${step === '3' ? 'step-primary' : ''}`}>{t('previousSchoolData')}</li>
                        <li className={`text-xs sm:text-[16px] sm:leading-8 step ${step === '4' ? 'step-primary' : ''}`}>{t('confirm')}</li>
                    </ul>
                    <div className="container px-8 mx-auto">
                        {step === '1' && <First handleNext={handleNext} studentData={values.studentData} />}
                        {step === '2' && <Second handleNext={handleNext} parentData={values.parentData} />}
                        {step === '3' && <Third handleNext={handleNext} previousSchoolData={values.previousSchoolData} />}
                        {step === '4' && <Fourth handleSubmit={handleSubmit} />}
                    </div>
                </div>
            </div>

        </PpdbLayout>
    )
}

export default Register
