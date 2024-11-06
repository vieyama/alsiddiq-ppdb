import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput';
import Label from '../Label';

const Third = ({ handleNext, previousSchoolData }) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const step = urlParams.get('step') ?? 1

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (previousSchoolData) {
            Object.keys(previousSchoolData).map(item => {
                setValue(item, previousSchoolData[item])
            })
        }
    }, [previousSchoolData])

    const onSubmit = data => handleNext({ previousSchoolData: data });

    const handleBack = () => {
        router.get(`/ppdb/register?step=${Number(step) - 1}`)

    }

    const yearsOptions = () => {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const yearsList = [];

        for (let i = 0; i <= 10; i++) {
            yearsList.push(nextYear - i);
        }

        return yearsList;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mb-10'>
            <div className='flex flex-col w-full gap-5 md:flex-row'>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.schoolNpsn')} className="label-text" />
                    </div>
                    <TextInput type="text" placeholder={t('form.schoolNpsn')} className="w-full minput input-bordered" {...register('schoolNpsn', { required: false })} />
                    {errors?.schoolNpsn?.type === "required" && <div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>}
                </label>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.schoolName')} className="label-text" />
                    </div>
                    <TextInput type="text" placeholder={t('form.schoolName')} className="w-full minput input-bordered" {...register('schoolName', { required: false })} />
                    {errors?.schoolName?.type === "required" && <div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>}
                </label>
            </div>
            <div className='flex flex-col w-full gap-5 md:flex-row'>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.schoolStatus')} className="label-text" />
                    </div>
                    <select defaultValue="" className="select select-bordered" {...register('schoolStatus', { required: false })}>
                        <option value="" disabled>{t('form.selectItem', { item: t('form.schoolStatus') })}</option>
                        <option value="NEGERI | Public">NEGERI | Public</option>
                        <option value="SWASTA | Private">SWASTA | Private</option>
                    </select>
                    {errors?.schoolStatus?.type === "required" && <div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>}
                </label>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.examModel')} className="label-text" />
                    </div>
                    <select className="select select-bordered" defaultValue="" {...register('examModel', { required: false })}>
                        <option value="" disabled>{t('form.selectItem', { item: t('form.examModel') })}</option>
                        <option value="UNBK | Computer-Based National Exam">UNBK | Computer-Based National Exam</option>
                        <option value="UNPK | Paper-and-pencil-based National Exam">UNPK | Paper-and-pencil-based National Exam</option>
                    </select>
                    {errors?.examModel?.type === "required" && <div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>}
                </label>
            </div>
            <div className='flex flex-col w-full gap-5 md:flex-row'>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.schoolAdress')} className="label-text" />
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder={t('form.schoolAdress')}  {...register('schoolAdress', { required: false })}></textarea>
                    {errors?.schoolAdress?.type === "required" && (<div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>)}
                </label>
                <label className="w-full form-control">
                    <div className="label">
                        <Label title={t('form.yearOfGraduation')} className="label-text" />
                    </div>
                    <select className="select select-bordered" defaultValue="" {...register('yearOfGraduation', { required: false })}>
                        <option value="" disabled>{t('form.selectItem', { item: t('form.yearOfGraduation') })}</option>
                        {yearsOptions().map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))}
                    </select>
                    {errors?.yearOfGraduation?.type === "required" && <div className="label">
                        <span className="text-red-500 label-text-alt">{t('required')}</span>
                    </div>}
                </label>
            </div>
            <div className='flex flex-col justify-end w-full gap-5 md:flex-row'>
                <button className="text-white px-9 btn btn-active btn-default" type='button' onClick={handleBack}>{t('prev')}</button>
                <button className="text-white px-9 btn btn-active btn-primary" type='submit'>{t('next')}</button>
            </div>
        </form>
    )
}

export default Third
