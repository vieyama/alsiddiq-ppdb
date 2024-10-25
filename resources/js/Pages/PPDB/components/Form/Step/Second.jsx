import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput';
import Label from '../Label';

const Second = ({ handleNext, parentData }) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const step = urlParams.get('step') ?? 1

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (parentData) {
            Object.keys(parentData).map(item => {
                setValue(item, parentData[item])
            })
        }
    }, [parentData])

    const onSubmit = data => handleNext({ parentData: data });

    const handleBack = () => {
        router.get(`/ppdb/register?step=${Number(step) - 1}`)

    }

    const parentsType = ['father', 'mother', 'guardian']

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mb-10'>

            {parentsType.map((item, key) => (
                <div key={key}>
                    <div className="justify-center text-white label bg-primary">
                        <Label title={t(`form.${item === 'guardian' ? 'guardianForm' : item}`)} className="text-xl font-semibold text-center" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className="w-full form-control">
                            <div className="label">
                                <Label title={t('form.fullName')} className="label-text" required={item !== 'guardian'} />
                            </div>
                            <TextInput type="text" placeholder={t('form.fullName')} className="w-full minput input-bordered" {...register(`${item}.fullName`, { required: item !== 'guardian' })} />
                            <div className="label text-start">
                                <span className="w-3/4 label-text-alt">{t('form.fullNameHint')}</span>
                                {errors?.[item]?.fullName?.type === "required" && <span className="text-red-500 label-text-alt">{t('required')}</span>}
                            </div>
                        </label>
                        <label className="w-full form-control">
                            <div className="label">
                                <Label title={t('form.education')} className="label-text" required={item !== 'guardian'} />
                            </div>
                            <select className="select select-bordered" defaultValue="" {...register(`${item}.education`, { required: item !== 'guardian' })}>
                                <option value="" disabled>{t('form.selectItem', { item: t('form.education') })}</option>
                                <option value="uneducated">{t('form.uneducated')}</option>
                                <option value="SD/MI">SD/MI</option>
                                <option value="SMP/MTs">SMP/MTs</option>
                                <option value="SMA/SMA/MA">SMA/SMA/MA</option>
                                <option value="DIPLOMA">DIPLOMA</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                            {errors?.[item]?.education?.type === "required" && <div className="label">
                                <span className="text-red-500 label-text-alt">{t('required')}</span>
                            </div>}
                        </label>
                        <label className="w-full form-control">
                            <div className="label">
                                <Label title={t('form.occupation')} className="label-text" required={item !== 'guardian'} />
                            </div>
                            <select className="select select-bordered" defaultValue="" {...register(`${item}.occupation`, { required: item !== 'guardian' })}>
                                <option value="" disabled>{t('form.selectItem', { item: t('form.occupation') })}</option>
                                {item === 'mother' && <option value="housewife">{t('form.housewife')}</option>}
                                <option value="labor">{t('form.labor')}</option>
                                <option value="farmer">{t('form.farmer')}</option>
                                <option value="enterpreneur">{t('form.enterpreneur')}</option>
                                <option value="militaryPolice">{t('form.militaryPolice')}</option>
                                <option value="fisherman">{t('form.fisherman')}</option>
                                {item !== 'mother' && <option value="housewife">{t('form.housewife')}</option>}
                            </select>
                            {errors?.[item]?.occupation?.type === "required" && <div className="label">
                                <span className="text-red-500 label-text-alt">{t('required')}</span>
                            </div>}
                        </label>
                        <label className="w-full form-control">
                            <div className="label">
                                <Label title={t('form.income')} className="label-text" required={item !== 'guardian'} />
                            </div>
                            <select className="select select-bordered" defaultValue="" {...register(`${item}.income`, { required: item !== 'guardian' })}>
                                <option value="" disabled>{t('form.selectItem', { item: t('form.income') })}</option>
                                <option value="< 10 Juta (Million)">&lt; 10 Juta (Million)</option>
                                <option value="10 - 20 Juta (Million)">10 - 20 Juta (Million)</option>
                                <option value="20 - 30 Juta (Million)">20 - 30 Juta (Million)</option>
                                <option value="30 - 40 Juta (Million)">30 - 40 Juta (Million)</option>
                                <option value="40 - 50 Juta (Million)">40 - 50 Juta (Million)</option>
                                <option value="> 50 Juta (Million)">&gt; 10 Juta (Million)</option>
                            </select>
                            {errors?.[item]?.income?.type === "required" && <div className="label">
                                <span className="text-red-500 label-text-alt">{t('required')}</span>
                            </div>}
                        </label>
                        <label className="w-full form-control">
                            <div className="label">
                                <Label title={t('form.phone')} className="label-text" required={item !== 'guardian'} />
                            </div>
                            <TextInput {...register(`${item}.phone`, {
                                required: {
                                    value: item !== 'guardian', message: t('required')
                                }, pattern: { value: /^\+?[0-9]{9,13}$/, message: t('form.phoneFormatIncorrect') }
                            })} placeholder={t('form.phone')} />
                            {errors?.[item]?.phone?.message && (<div className="label">
                                <span className="text-red-500 label-text-alt">{errors?.[item]?.phone?.message}</span>
                            </div>)}
                        </label>
                    </div>
                </div>
            ))}
            <div className='flex flex-col justify-end w-full gap-5 md:flex-row'>
                <button className="text-white px-9 btn btn-active btn-default" type='button' onClick={handleBack}>{t('prev')}</button>
                <button className="text-white px-9 btn btn-active btn-primary" type='submit'>{t('next')}</button>
            </div>
        </form>
    )
}

export default Second
