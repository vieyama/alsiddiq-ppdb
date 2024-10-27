import React from 'react'

const Cop = () => {
  return (
    <>
          <div className='flex w-full'>
              <div className='w-[150px]'>
                  <img src="/logo.png" alt="logo2" width={150} />
              </div>
              <div className='w-full'>
                  <div className='flex flex-col leading-7 text-center'>
                      <span className='text-[23px] font-bold'>
                          PANITIA PENERIMAAN PESERTA DIDIK BARU <br /> (PPDB)
                      </span>
                      <span className='text-[30px] font-bold'>AL SIDDIQ INTERNATIONAL</span>
                      <span className='text-[20px] font-bold'>TAHUN PELAJARAN 2024 / 2025</span>
                  </div>
                  <div className='flex flex-col items-center mt-3 leading-5'>
                      <div className='text-[15px] flex flex-col'>
                          <span>Sekretariat : Jl. H. Toha RT 002 RW 006 Jatimakmur Pondok Gede Kota
                              Bekasi</span>
                          <span className='text-[15px] flex flex-wrap items-center justify-center'>
                              <img
                                  src="/telp.jpg"
                                  alt="telp."

                              />{" "}
                              +62 819 4611 8111. Jawa Barat - Indonesia{" "}
                              <img
                                  src="/kode_pos.jpg"
                                  alt="Kode Pos."
                              />{" "}
                              17413
                          </span>
                      </div>
                      <span> Website : https://alsiddiqintl.com/ e-mail : info@alsiddiqintl.com</span>
                  </div>
              </div>
          </div>
          <div className='mt-2 border border-b-[0.3px] border-black' />
          <div className='mt-[2px] border border-b-[0.5px] border-black' />
    </>
  )
}

export default Cop
