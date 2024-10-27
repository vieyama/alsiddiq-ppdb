import dayjs from 'dayjs'
import React from 'react'

const Ttd = () => {
  return (
      <div className='flex justify-end w-full mt-6'>
          <div className='flex flex-col text-start'>
              <span>Kota Bekasi, {dayjs().format('DD MMMM YYYY')}<br />Ketua Panitia PPDB,</span>
              <img src="/ttd-haris.png" className="w-32" />
              <u className='font-bold'>Abdullah Haris, Lc. M.Pd.</u>
          </div>
      </div>
  )
}

export default Ttd
