import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'

const Fourth = ({ handleSubmit }) => {
    const { t } = useTranslation();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const step = urlParams.get('step') ?? 1
    const [isValid, setIsValid] = useState(false)

    const handleChangeValidation = () => {
        setIsValid(!isValid)
    }
    const handleBack = () => {
        router.get(`/ppdb/register?step=${Number(step) - 1}`)
    }

    return (
        <div className="w-full max-w-screen-xl mx-auto shadow-xl card bg-base-100">
            <figure className="px-10 pt-10">
                <img
                    src="/evaluation.png"
                    alt="Shoes"
                    className="w-28" />
            </figure>
            <div className="items-center text-center card-body">
                <p>{t('validateString')}</p>

                <div role="alert" className="alert">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 stroke-info shrink-0">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{t('isValidString')}</span>
                    <label className="cursor-pointer label">
                        <span className="mr-5 label-text">{t('validate')}</span>
                        <input type="checkbox" className="checkbox" onChange={handleChangeValidation} />
                    </label>
                </div>
                <div className="mt-5 card-actions">
                    <button className="text-white px-9 btn btn-active btn-default" type='button' onClick={handleBack}>{t('prev')}</button>
                    <button className="text-white px-9 btn btn-active btn-primary" type='button' onClick={handleSubmit} disabled={!isValid}>{t('registerNow')}</button>
                </div>
            </div>
        </div>
    )
}

export default Fourth
