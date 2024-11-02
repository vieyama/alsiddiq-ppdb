import dayjs from 'dayjs'
import React from 'react'

const Ttd = ({ ppdbSetting }) => {
    return (
        <div className='flex justify-end w-full mt-6'>
            <div className='flex flex-col text-start'>
                <span>Kota Bekasi, {dayjs().format('DD MMMM YYYY')}<br />Ketua Panitia PPDB,</span>
                <img src={ppdbSetting?.signature ? `/uploads/${ppdbSetting?.signature}` : "/ttd.png"}
                    className='w-full max-w-28' />
                <u className='font-bold'>{ppdbSetting?.chairman ?? 'Abdullah Haris, Lc. M.Pd.'}</u>
            </div>
        </div>
    )
}

export default Ttd
