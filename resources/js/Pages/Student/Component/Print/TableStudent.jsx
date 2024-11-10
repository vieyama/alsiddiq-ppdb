import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TableStudent = ({ parents, studentRegistration, student, school }) => {
    const { t } = useTranslation()

  return (
      <table width="100%" border={0} className='mt-4 leading-5'>
          <tbody>
              <tr>
                  <td className='pl-8' width={250}>NO. PENDAFTARAN</td>
                  <td width={1}>:</td>
                  <td>{studentRegistration?.register_number}</td>
              </tr>
              <tr>
                  <td className='pl-8'>TANGGAL PENDAFTARAN </td>
                  <td>:</td>
                  <td>{dayjs(student?.created_at).format('DD MMMM YYYY')}</td>
              </tr>
              <tr>
                  <td className="pl-8">TANGGAL CETAK </td>
                  <td>:</td>
                  <td>{dayjs().format('DD MMMM YYYY')}</td>
              </tr>
              <tr>
                  <td className="pl-8">NIS</td>
                  <td>:</td>
                  <td>{student?.nis}</td>
              </tr>
              <tr>
                  <td className="pl-8">NISN</td>
                  <td>:</td>
                  <td>{student?.nisn}</td>
              </tr>
              <tr>
                  <td className="pl-8">NIK</td>
                  <td>:</td>
                  <td>{student?.nik}</td>
              </tr>
              <tr>
                  <td className="pl-8">NAMA LENGKAP</td>
                  <td>:</td>
                  <td>{student?.fullname}</td>
              </tr>
              <tr>
                  <td className="pl-8">JENIS KELAMIN</td>
                  <td>:</td>
                  <td>{student?.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}</td>
              </tr>
              <tr>
                  <td className="pl-8">TEMPAT, TANGGAL LAHIR</td>
                  <td>:</td>
                  <td>{student?.pob}, {dayjs(student?.dob).format('DD MMMM YYYY')}</td>
              </tr>
              <tr>
                  <td className="pl-8">AGAMA</td>
                  <td>:</td>
                  <td className='capitalize'>{student?.religion}</td>
              </tr>
              <tr>
                  <td className="pl-8">NAMA ORANG TUA /WALI</td>
                  <td>:</td>
                  <td />
              </tr>
              {parents?.map((item, key) => (
                  <tr key={key}>
                      <td className='pl-[65px] uppercase'>{t(item.type)}</td>
                      <td>:</td>
                      <td>{item.fullname}</td>
                  </tr>
              ))}
              <tr>
                  <td className="pl-8">NO. HANDPHONE (HP)</td>
                  <td>:</td>
                  <td>{student?.phone}</td>
              </tr>
              <tr>
                  <td className="pl-8">ASAL SEKOLAH</td>
                  <td>:</td>
                  <td>{school?.school_name}</td>
              </tr>
          </tbody>
      </table>
  )
}

export default TableStudent
