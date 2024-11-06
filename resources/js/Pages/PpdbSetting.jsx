import Head from '@/Components/Head'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { DocumentChartBarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import UpdateSignatureModal from './Admin/UpdateSignatureModal';
import { useState } from 'react';

const PpdbSetting = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const ppdbSetting = usePage().props.ppdbSetting
    const { data, setData, patch, errors, processing, recentlySuccessful, setError } =
        useForm({
            status: ppdbSetting?.status,
            registration_year: ppdbSetting?.registration_year,
            chairman: ppdbSetting?.chairman,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('ppdb-setting-update', { id: ppdbSetting?.id }));
    };

    const switchRegistrationStatus = () => {
        router.patch(`/ppdb-setting/update/${ppdbSetting?.id}`, {
            status: ppdbSetting?.status === 'active' ? 'close' : 'active',
            ...(ppdbSetting?.status === 'close' && { registration_year: Number(ppdbSetting?.registration_year) + 1 })
        }, {
            onError: err => {
                setError(err);
            },
            onSuccess: (res) => {
                setData({
                    chairman: res.props.ppdbSetting?.chairman,
                    registration_year: res.props.ppdbSetting?.registration_year,
                    status: res.props.ppdbSetting?.status,
                })
            }
        })
    }

    const clearAlert = () => {
        setError('error', null)
    }

    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan PPDB" />
            <div>
                <h2 className='text-lg font-bold'>Pengaturan PPDB</h2>
                <div className='mt-6'>
                    <div role="alert" className="alert">
                        <DocumentChartBarIcon className='size-6' />
                        <span>Status Pendaftaran PPDB Online <b className={`p-1 text-white ${ppdbSetting?.status === 'active' ? 'bg-primary' : 'bg-orange-300'}`}>{ppdbSetting?.status === 'active' ? 'masih dibuka' : 'telah ditutup'}.</b> Terakhir diubah {dayjs(ppdbSetting?.updated_at).format('DD-MM-YYYY H:m:ss')}.</span>
                        <div>
                            <button onClick={switchRegistrationStatus} className="btn btn-sm btn-primary">{ppdbSetting?.status === 'active' ? 'Tutup' : 'Buka'} Pendaftaran</button>
                        </div>
                    </div>
                </div>
                {errors.error && <div role="alert" className="mt-8 alert alert-warning">
                    <ExclamationTriangleIcon className='size-5' />
                    <span>{errors.error}</span>
                    <div>
                        <button className="btn btn-circle btn-sm" onClick={clearAlert}>
                            <XMarkIcon className='size-5' />
                        </button>
                    </div>
                </div>
                }
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="chairman" value="Ketua Panitia PPDB" />

                        <TextInput
                            id="chairman"
                            className="block w-full mt-1"
                            value={data.chairman}
                            onChange={(e) => setData('chairman', e.target.value)}
                            required
                            isFocused
                            autoComplete="chairman"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <InputLabel htmlFor="chairman" value="Tahun Pendaftaran PPDB" />

                        <TextInput
                            type="number"
                            min={data?.registration_year}
                            max={data?.registration_year + 1}
                            id="chairman"
                            className="block w-full mt-1"
                            value={data?.registration_year}
                            onChange={(e) => setData('registration_year', e.target.value)}
                            required
                            autoComplete="registration_year"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </form>
                <div className='flex flex-col items-start gap-5 mt-10 mb-5'>
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={ppdbSetting?.signature ? `/uploads/${ppdbSetting?.signature}` : '/ttd.png'} />
                        </div>
                    </div>
                    <button className='btn btn-sm' onClick={() => setIsOpenModal(true)}>Ubah Gambar Tanda Tangan</button>
                </div>
            </div>
            <UpdateSignatureModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} photo={ppdbSetting?.signature ? `/uploads/${ppdbSetting?.signature}` : '/ttd.png'} />
        </AuthenticatedLayout>
    )
}

export default PpdbSetting
