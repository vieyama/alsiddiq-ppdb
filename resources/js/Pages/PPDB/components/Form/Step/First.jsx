import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextInput from '@/Components/TextInput';
import Label from '../Label';
import { router } from '@inertiajs/react';
import Toast from '@/Components/Toast';

const First = ({ handleNext, studentData }) => {

    const { t } = useTranslation();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const [registerError, setRegisterError] = useState(null)

    useEffect(() => {
        if (studentData) {
            Object.keys(studentData).map(item => {
                setValue(item, studentData[item])
            })
        }
    }, [studentData])

    const onSubmit = data => {
        router.post("/ppdb/check", { nis: data.nis, nisn: data.nisn }, {
            onSuccess: () => {
                handleNext({ studentData: data })
            },
            onError: (err) => {
                setRegisterError(err.error);
            }
        });
    };

    const gradeOptions = () => {
        const selectedLevel = watch('level')
        switch (selectedLevel) {
            case 'tk':
                return ['A', 'B']
            case 'sd':
                return [1, 2, 3, 4, 5, 6]
            case 'smp':
                return [7, 8, 9]
            default:
                return ['A', 'B']
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mb-10'>
                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.chooseLevel')} className="label-text" required />
                        </div>
                        <select className="select select-bordered" {...register('level', { required: true })}>
                            <option value="tk">TK | Kindergarten</option>
                            <option value="sd">SD | Elementary School</option>
                            <option value="smp">SMP | Junior High School</option>
                        </select>
                        {errors?.level?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.chooseClass')} className="label-text" required />
                        </div>
                        <select className="select select-bordered" {...register('grade', { required: true })}>
                            {gradeOptions().map((item, key) => (
                                <option key={key}>{item}</option>
                            ))}
                        </select>
                        {errors?.grade?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.nis')} className="label-text" required />
                        </div>
                        <TextInput type="text" placeholder={t('form.nis')} className="w-full minput input-bordered" {...register('nis', { required: true })} />
                        <div className="label text-start">
                            <span className="w-3/5 label-text-alt">{t('form.nisHint')}</span>
                            {errors?.nis?.type === "required" && <span className="text-red-500 label-text-alt">{t('required')}</span>}
                        </div>
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.nisn')} className="label-text" required />
                        </div>
                        <TextInput type="text" placeholder={t('form.nisn')} className="w-full minput input-bordered" {...register('nisn', { required: true })} />
                        <div className="label text-start">
                            <span className="w-3/5 label-text-alt">{t('form.nisnHint')}</span>
                            {errors?.nisn?.type === "required" && <span className="text-red-500 label-text-alt">{t('required')}</span>}
                        </div>
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.nik')} className="label-text" required />
                        </div>
                        <TextInput type="text" placeholder={t('form.nik')} className="w-full minput input-bordered" {...register('nik', { required: true })} />
                        <div className="label text-start">
                            <span className="w-3/4 label-text-alt">{t('form.nikHint')}</span>
                            {errors?.nik?.type === "required" && <span className="text-red-500 label-text-alt">{t('required')}</span>}
                        </div>
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.fullName')} className="label-text" required />
                        </div>
                        <TextInput type="text" placeholder={t('form.fullName')} className="w-full minput input-bordered" {...register('fullName', { required: true })} />
                        <div className="label text-start">
                            <span className="w-3/4 label-text-alt">{t('form.fullNameHint')}</span>
                            {errors?.fullName?.type === "required" && <span className="text-red-500 label-text-alt">{t('required')}</span>}
                        </div>
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.gender')} className="label-text" required />
                        </div>
                        <select className="select select-bordered" {...register('gender', { required: true })}>
                            <option value="male">Laki-laki | Male | ذكر</option>
                            <option value="famale">Perempuan | Female | أنثى</option>
                        </select>
                        {errors?.gender?.type === "required" && <div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>}
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.pob')} className="label-text" required />
                        </div>
                        <TextInput type="text" placeholder={t('form.pob')} className="w-full minput input-bordered" {...register('pob', { required: true })} />
                        {errors?.pob?.type === "required" && <div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>}
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.dob')} className="label-text" required />
                        </div>
                        <TextInput type="date" className="w-full minput input-bordered" placeholder={t('form.dob')} {...register('dob', { required: true })} />
                        {errors?.dob?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.religion')} className="label-text" required />
                        </div>
                        <select className="select select-bordered" {...register('religion', { required: true })}>
                            <option value="islam">Islam | Islamic</option>
                        </select>
                        {errors?.religion?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.familiyStatus')} className="label-text" required />
                        </div>
                        <select className="select select-bordered" {...register('familiyStatus', { required: true })}>
                            <option value="biological">{t('form.biological')}</option>
                            <option value="adopted">{t('form.adopted')}</option>
                        </select>
                        {errors?.familiyStatus?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.phone')} className="label-text" required />
                        </div>
                        <TextInput {...register('phone', { required: t('required'), pattern: { value: /^\+?[0-9]{9,13}$/, message: t('form.phoneFormatIncorrect') } })} />
                        {errors?.phone?.message && (<div className="label">
                            <span className="text-red-500 label-text-alt">{errors?.phone?.message}</span>
                        </div>)}
                    </label>
                </div>

                <div className='flex flex-col w-full gap-5 md:flex-row'>
                    <label className="w-full form-control">
                        <div className="label">
                            <Label title={t('form.address')} className="label-text" required />
                        </div>
                        <textarea className="textarea textarea-bordered" placeholder={t('form.address')}  {...register('address', { required: true })}></textarea>
                        {errors?.address?.type === "required" && (<div className="label">
                            <span className="text-red-500 label-text-alt">{t('required')}</span>
                        </div>)}
                    </label>
                </div>
                <div className='flex flex-col justify-end w-full gap-5 md:flex-row'>
                    <button className="text-white px-9 btn btn-active btn-primary" type='submit'>Next</button>
                </div>
            </form>
            {registerError && <Toast message={registerError} setMessage={setRegisterError} position='top' type='error' />}
        </>
    )
}

export default First
