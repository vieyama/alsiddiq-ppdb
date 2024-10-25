import Modal from '@/Components/Modal'
import { router } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TocModal = ({ isOpen, onClose }) => {
    const currentYear = new Date().getFullYear()
    const { t } = useTranslation()

    const handleApprove = () => {
        router.get('/ppdb/register?step=1')
    }

    return (
        <Modal maxWidth='2xl' show={isOpen} onClose={onClose} className="modal">
            <div className="mb-4">
                <h3 className="text-xl font-normal">{t('termTitle')} <b>{t('title')}</b></h3>
                <h6 className="text-md">{t('schoolsYears', { year: `${currentYear + 1}-${currentYear + 2}` })} </h6>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <tbody>
                        {t('termItems', { returnObjects: true }).map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="modal-action">
                <button className="btn btn-warning" onClick={onClose}>Batal</button>
                <button className="btn btn-primary" onClick={handleApprove}>Setuju & Lanjutkan</button>
            </div>
        </Modal>
    )
}

export default TocModal
