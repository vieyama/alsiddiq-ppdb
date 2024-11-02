import Modal from '@/Components/Modal'
import { useForm, usePage } from '@inertiajs/react';
import { isEmpty } from 'lodash';
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalEditPassedNotes = ({ isOpen, onClose }) => {
    const ppdbSetting = usePage().props.ppdbSetting

    const { data, setData, patch } =
        useForm({
            status: ppdbSetting?.status,
            registration_year: ppdbSetting?.registration_year,
            chairman: ppdbSetting?.chairman,
            verification_notes: ppdbSetting?.verification_notes,
            passed_notes: isEmpty(ppdbSetting?.passed_notes) ? null : ppdbSetting?.passed_notes
        });

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const submit = (e) => {
        e.preventDefault();
        patch(route('ppdb-setting-update', { id: ppdbSetting?.id }), {
            onSuccess: () => onClose()
        });
    };

    return (
        <Modal maxWidth='2xl' show={isOpen} onClose={onClose} className="modal">
            <div className="mb-4">
                <h3 className="text-xl font-normal">Edit Edit Keterangan Lulus</h3>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className='flex flex-col gap-2'>
                    <span>Edit Keterangan Lulus:</span>
                    <ReactQuill theme="snow"
                        modules={modules}
                        formats={formats} value={data.passed_notes} onChange={e => setData('passed_notes', e)} />
                </div>
                <div className="modal-action">
                    <button className="btn btn-warning" type='button' onClick={onClose}>Batal</button>
                    <button className="btn btn-primary" type='submit'>Simpan</button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalEditPassedNotes
