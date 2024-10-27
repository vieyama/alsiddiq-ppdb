import React, { useEffect } from 'react'

const Toast = ({ message, setMessage, position = 'top', type = 'info' }) => {
    useEffect(() => {
        if (message) {
            setTimeout(() => setMessage(null), 2000)
        }
    }, [message])

    const toastPosition = () => {
        switch (position) {
            case 'top':
                return 'top-20'
            case 'bottom':
                return 'bottom-24'
            case 'left':
                return 'left-0'
            case 'right':
                return 'right-0 bottom-24'
            default:
                return 'top-20'
        }
    }

    return (
        message && <div className={`z-30 ${toastPosition()} toast w-fit`}>
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Toast
