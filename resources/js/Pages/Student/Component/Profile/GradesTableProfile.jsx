import { calculateAverage } from "@/utils/calculateAverage";
import { sum } from "lodash";

const GradesTableProfile = ({ report, grades }) => {
    const usbn = grades?.filter(item => item.type === 'usbn')
    const unbk = grades?.filter(item => item.type === 'unbk')

    return (
        <div className="flex flex-col gap-6">
            <div className="w-full p-2 overflow-x-auto shadow-md">
                <span className="ml-4 font-bold">Nilai Rapor</span>
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <td className="border" rowSpan={2}>Mata Pelajaran</td>
                            <td className="border" colSpan={5}>Semester</td>
                            <td className="border" rowSpan={2}>Rata-Rata Nilai</td>
                        </tr>
                        <tr>
                            <td className="border">1</td>
                            <td className="border">2</td>
                            <td className="border">3</td>
                            <td className="border">4</td>
                            <td className="border">5</td>
                        </tr>
                    </thead>
                    <tbody>
                        {report?.map((item, key) => (
                            <tr key={key}>
                                <td className="border">{item.subject}</td>
                                <td className="border">{item.grade_smt_1}</td>
                                <td className="border">{item.grade_smt_2}</td>
                                <td className="border">{item.grade_smt_3}</td>
                                <td className="border">{item.grade_smt_4}</td>
                                <td className="border">{item.grade_smt_5}</td>
                                <td className="border">{item.average}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="border" colSpan={6}>Rata-Rata Rapor</td>
                            <td className="border">
                                {calculateAverage(report.flatMap(item => item.average))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between w-full gap-4">
                <div className="w-full p-2 overflow-x-auto shadow-md">
                    <span className="ml-4 font-bold">Nilai USBN</span>
                    <table className="table border">
                        {/* head */}
                        <thead>
                            <tr>
                                <td className="border">Mata Pelajaran</td>
                                <td className="border">Nilai USBN</td>
                            </tr>
                        </thead>
                        <tbody>
                            {usbn.map((item, key) => (
                                <tr key={key}>
                                    <td className="border">{item.subject}</td>
                                    <td className="border">{item.grade}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="font-bold border">Jumlah Nilai USBN</td>
                                <td className="border">{sum(usbn.flatMap(item => item.grade))}</td>
                            </tr>
                            <tr>
                                <td className="font-bold border">Rata–Rata Nilai USBN</td>
                                <td className="border">{calculateAverage(usbn.flatMap(item => item.grade))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full p-2 overflow-x-auto shadow-md">
                    <span className="ml-4 font-bold">Nilai UNKP/UNBK</span>
                    <table className="table border">
                        {/* head */}
                        <thead>
                            <tr>
                                <td className="border">Mata Pelajaran</td>
                                <td className="border">Nilai UNKP/UNBK</td>
                            </tr>
                        </thead>
                        <tbody>
                            {unbk.map((item, key) => (
                                <tr key={key}>
                                    <td className="border">{item.subject}</td>
                                    <td className="border">{item.grade}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="font-bold border">Jumlah Nilai UNKP/UNBK</td>
                                <td className="border">{sum(unbk.flatMap(item => item.grade))}</td>
                            </tr>
                            <tr>
                                <td className="font-bold border">Rata–Rata Nilai UNKP/UNBK</td>
                                <td className="border">{calculateAverage(unbk.flatMap(item => item.grade))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GradesTableProfile
