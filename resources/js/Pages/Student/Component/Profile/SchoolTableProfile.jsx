const SchoolTableProfile = ({ school }) => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <tbody>
                    <tr>
                        <th>NPSN Sekolah:</th>
                        <td>{school?.school_npsn ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Nama Sekolah:</th>
                        <td>{school?.school_name ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Status Sekolah:</th>
                        <td>{school?.school_status ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Model Ujian Nasional:</th>
                        <td>{school?.exam_model ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Alamat Sekolah:</th>
                        <td>{school?.school_adress ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Tahun Lulus:</th>
                        <td>{school?.year_of_graduation ?? '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SchoolTableProfile
