import Modal from '@/Components/Modal'
import { useForm, usePage } from '@inertiajs/react'
import React from 'react'

const UpdateSignatureModal = ({ isOpen, onClose, photo }) => {
    const csrfToken = usePage().props.csrf_token;
    const { setData, errors, post } = useForm({
        file: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ppdb-setting.update-photo"), {
            onSuccess: () => {
                setData("file", null)
                onClose()
            },
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
        });
    }

    return (
        <Modal maxWidth='' show={isOpen} onClose={onClose} className="modal">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center gap-5'>
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={photo} />
                        </div>
                    </div>
                    <input type="file" className="w-full max-w-xs file-input file-input-bordered" name="file" onChange={(e) =>
                        setData("file", e.target.files[0])
                    } />
                    <span className='text-red-500'>{errors.file}</span>
                </div>
                <div className="modal-action">
                    <button className="btn btn-warning" type='button' onClick={onClose}>Batal</button>
                    <button className="btn btn-primary" type='submit'>Ubah</button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdateSignatureModal
