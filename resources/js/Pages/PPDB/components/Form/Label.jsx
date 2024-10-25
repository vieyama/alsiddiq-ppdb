import { cn } from '@/utils/cn'
import React from 'react'

const Label = ({ title, required = false, className }) => {
    return (
        <label className={cn('', className)}>{title} {required && <span className='text-red-600'>*</span>}</label>
    )
}

export default Label
