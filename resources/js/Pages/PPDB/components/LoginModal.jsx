import React from 'react'
import TextInput from '@/Components/TextInput'
import { KeyIcon, UsersIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next';
import Modal from '@/Components/Modal';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useForm, usePage } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

const LoginModal = ({ isOpen, onClose }) => {
    const csrfToken = usePage().props.csrf_token;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { t } = useTranslation();

    const onSubmit = (values) => {
        values.preventDefault();
        post(route('login'), {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <Modal maxWidth='xl' show={isOpen} onClose={onClose} className="modal">
            <div className="">
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Login Calon Siswa</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>
                <div className="flex flex-col items-center text-center my-7">
                    <img src="/logo.png" alt="" className="w-16 mb-3" />
                    <span className="text-lg font-semibold">Login Administrasi Calon Siswa</span>
                    <span className="text-sm font-normal"> Masukkan No. Pendaftaran dan Password yang diperoleh saat melakukan pendaftaran secara online.</span>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-3 mt-5">
                        <TextInput icon={<UsersIcon />} name="email" placeholder={t('registrationNumber')} onChange={(e) => setData('email', e.target.value)} value={data.email} />
                        {errors.email && (<div className="label">
                            <span className="text-red-500 label-text-alt">{errors.email}</span>
                        </div>)}
                        <TextInput icon={<KeyIcon />} placeholder="NIS" type="password" name="password" onChange={(e) => setData('password', e.target.value)} value={data.password} />
                        {errors?.password && (<div className="label">
                            <span className="text-red-500 label-text-alt">{errors?.password}</span>
                        </div>)}
                    </div>
                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="text-sm text-gray-600 ms-2">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <div className="modal-action">

                        <button disabled={processing} className="w-40 text-white btn btn-md btn-primary" type="submit">
                            <ArrowRightStartOnRectangleIcon className="size-6" />Login</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default LoginModal
