import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            title: "AL SIDDIQ INTERNATIONAL SCHOOL",
            information: "Information",
            contact: "Contact Us",
            downloadGuidline: 'Download Guideline',
            register: 'Register',
            price: "Registration Fee",
            studentLogin: 'Student Login',
            flow: "Registration Flow",
            ppdbInformationTitle: "Online Enrolment Information",
            ppdbInformationTitleDesc1: 'AL SIDDIQ INTERNATIONAL SCHOOL has provided online enrollment with the hope that the enrollment process can run quickly and can be done anywhere and anytime as long as the online enrollment session is open. The enrollment process does not use conventional forms, but only by accessing the Online Enrollment website of AL SIDDIQ INTERNATIONAL SCHOOL.',
            ppdbInformationTitleDesc2: 'To fill out the Online Enrollment form, please mind the data needed to be used in the enrollment process. Once the process of filling out the enrollment online form is successful, student candidates will receive proof of enrollment with an enrollment number and must be saved for use in the next process',
            registrationFlow: "Online Enrollment Flow",
            procedure: "EXPLANATION OF ONLINE ENROLLMENT PROCEDURE",
            step1: "Open the Registration Website",
            step2: "Pay For the Form",
            step3: "Take the Written Test And Interview",
            step4: "See the Selection Announcement",
            step5: "Reregistrate",
            tk: "Kindergarten School",
            sd: "Elementary School",
            smp: "Junior High School",
            registrationAccount: 'Registration Account',
            registrationNumber: "Registration Number",
            termTitle: "Terms of Enrollment Online",
            schoolsYears: "Kindergarten, Elementary and Middle School for the {{year}} Academic Year",
            registrationProcedure: [
                "Student candidates enroll online via the enrollment website of AL SIDDIQ INTERNATIONAL SCHOOL.",
                "After successfully enrolling, student candidates must print out the proof of enrollment.",
                "Student candidates pay the enrollment fee according to the school level, then confirm the payment to the School Admin.",
                "The School Admin will change the Student Enrollment Status and provide a Test and schedule an interview for the parents.",
                "During the Test & Interview, Student candidates come to AL SIDDIQ INTERNATIONAL SCHOOL for VERIFICATION by bringing the proof of enrollment & complete enrollment documents.",
                "Student candidates must take the ACADEMIC POTENTIAL TEST, and their parents/ guardians must conduct an Interview with the Enrollment Committee.",
                "Online ANNOUNCEMENT OF ADMISSION RESULTS can be seen on the enrollment website of AL SIDDIQ INTERNATIONAL SCHOOL, by logging in using the Username according to the Enrollment Number, and the Password is the Student Identification Number(NIS) of the student candidate.",
                "If declared PASSED, student candidates must re - register at AL SIDDIQ INTERNATIONAL SCHOOL."
            ],
            termItems: [
                'Each student candidate must fill out the enrollment form completely.',
                "The data entered in the online enrollment form must match the original data and be true.",
                "Prepare colored photos in JPG format with a maximum size of 2MB each to be uploaded via the Online enrollment form",
                "Student candidates who have enrolled online will get an Enrollment Number which must be printed and attached to the requirements requested by the AL SIDDIQ INTERNATIONAL Enrollment Committee.",
                "Student candidates who have enrolled via the AL SIDDIQ INTERNATIONAL Online Enrollment will get an Enrollment Number and Password which will later be used to access information related to enrollment.",
                "Student candidates who have enrolled themselves via the AL SIDDIQ INTERNATIONAL Online Enrollment are required to submit the required documents determined by the Enrollment Committee.",
                "very student candidate who has enrolled must take the selection test held by the AL SIDDIQ INTERNATIONAL Enrollment committee.",
                "The data that has been submitted to AL SIDDIQ INTERNATIONAL Enrollment Committee is only used for the purposes of student admission and the data will not be published and will be kept confidential by the Enrollment Committee.."
            ],
            studentData: 'Student Data',
            parentData: 'Parent/Guardian Data',
            previousSchoolData: 'Past School Information (If Applicable)',
            confirm: 'Confirmation',
            required: 'Field ini wajib diisi',
            form: {
                enrollmentType: "Enrollment Type",
                chooseLevel: "Choose Level",
                chooseClass: "Choose Grade",
                nis: 'Student Identification Number (NIS)',
                nisHint: '*Fill in the NIS if you already have one. If not, fill in a combination of numbers (to be used as a login password)',
                nisn: 'National Student Identification Number (NISN)',
                nisnHint: "According to data from the web, http://nisn.data.kemdikbud.go.id If you don't have it, fill in 001",
                nik: 'Family Identification Number (NIK) - Student',
                nikHint: '*In accordance with the Family Card (KK)',
                schoolDistance: "Distance from home to school",
                hobby: "Hobby",
                aspiration: "Aspiration",
                fullName: 'Full Name',
                fullNameHint: '*In accordance with the Family Card (KK)',
                gender: 'Gender',
                pob: 'Place of birth',
                dob: 'Date of birth',
                religion: 'Religion',
                familiyStatus: 'Status in the Family',
                address: 'Address',
                phone: 'Phone Number',
                phoneFormatIncorrect: 'The phone number format is incorrect.',
                biological: "Biological Child",
                adopted: "Adopted Child",
                father: "Father's Data",
                mother: "Mother's Data",
                guardian: 'Guardian’s Data (filled in if the child does not live with parents)',
                education: "Education",
                uneducated: "Uneducated",
                occupation: "Occupation",
                selfEmployed: "Self Employed",
                entrepreneur: "Entrepreneur",
                labor: "Labor",
                retiree: "Retiree",
                indonesianWorkers: "Indonesian Workers",
                stateOwnedEmployees: "State Owned Employees",
                passedAway: "Passed Away",
                otherJob: "Other",
                farmer: "Farmer",
                militaryPolice: "Military / Police",
                fisherman: "Fisherman",
                housewife: "Housewife",
                income: "Income",
                selectItem: "Select {{item}}",
                schoolNpsn: "School's NPSN",
                schoolName: "School's Name",
                schoolStatus: 'School’s Status',
                examModel: "National Exam Model",
                schoolAdress: "School’s Address",
                yearOfGraduation: "Year of Graduation"
            },
            next: "Next",
            prev: "Previous",
            registerNow: "Register Now",
            validateString: 'The AL SIDDIQ INTERNATIONAL SCHOOL Online Enrollment process is almost complete. Please double-check the data of student candidate that you have entered.',
            isValidString: 'Is the data of the student candidate already correct and complete?',
            validate: 'Yes, the data is correct and complete.',
            father: 'Father',
            mother: 'Mother',
            guardian: 'Guardian'
        }
    },
    id: {
        translation: {
            welcome: "Selamat datang di React dan react-i18next",
            title: "YAYASAN AL SIDDIQ INTERNATIONAL",
            information: "Informasi",
            contact: "Hubungi Kami",
            downloadGuidline: 'Unduh Panduan',
            register: 'Daftar',
            flow: "Alur Pendaftaran",
            price: "Biaya Pendaftaran",
            studentLogin: 'Login Siswa',
            ppdbInformationTitle: "Informasi PPDB",
            ppdbInformationTitleDesc1: 'AL SIDDIQ INTERNATIONAL SCHOOL sudah menyediakan PPDB secara online dengan harapan proses pendaftaran dapat berjalan cepat dan bisa dilakukan di mana pun dan kapan pun selama sesi PPDB online dibuka. Proses pendaftaran calon siswa baru tidak menggunakan formular konvensional, melainkan hanya dengan mengakses website PPDB Online AL SIDDIQ INTERNATIONAL SCHOOL.',
            ppdbInformationTitleDesc2: 'Untuk mengisi form PPDB Online, mohon diperhatikan data yang dibutuhkan untuk dipakai dalam proses PPDB. Setelah proses pengisian form PPDB secara online berhasil dilakukan, calon siswa akan mendapat bukti daftar dengan nomor pendaftaran dan harus disimpan untuk digunakan dalam proses selanjutnya.',
            registrationFlow: "Alur Pendaftaran PPBD Online",
            procedure: "PENJELASAN PROSEDUR PPDB ONLINE",
            step1: "Membuka Website Pendaftaran",
            step2: "Pembayaran Formulir",
            step3: "Tes Tulis dan Wawancara",
            step4: "Pengumuman Kelulusan",
            step5: "Daftar Ulang",
            tk: "Taman Kanak-Kanak (TK)",
            sd: "Sekolah Dasar (SD)",
            smp: "Sekolah Menengah Pertama (SMP)",
            registrationAccount: 'Rekening Pendaftaran',
            registrationNumber: "Nomor Pendaftaran",
            termTitle: "Ketentuan PPDB Online",
            schoolsYears: "TK, SD dan SMP Tahun Ajaran {{year}}",
            registrationProcedure: [
                "Calon Siswa melakukan Pendaftaran PPDB online melalui website PPDB AL SIDDIQ INTERNATIONAL SCHOOL.",
                "Setelah berhasil melakukan pendaftaran, Calon siswa wajib melakukan Print Out Pendaftaran",
                "Calon Siswa membayar Biaya Pendaftaran sesuai tingkat sekolah, kemudian melakukan konfirmasi pembayaran ke Admin Sekolah",
                "Admin Sekolah akan mengubah Status Pendaftaran Siswa dan memberi Jadwal Tes dan Wawancara Orang Tua",
                "Ketika Tes & Wawancara, Calon siswa datang ke AL SIDDIQ INTERNATIONAL SCHOOL untuk VERIFIKASI, dengan membawa Bukti pendaftaran & Kelengkapan Berkas PPDB.",
                "Calon Siswa wajib melakukan TES POTENSI AKADEMIK dan orang tua / walinya wajib melakukan Wawancara dengan Panitia PPDB.",
                "PENGUMUMAN HASIL PPDB Online bisa dilihat di Website PPDB AL SIDDIQ INTERNATIONAL SCHOOL, dengan cara login menggunakan Username sesuai dengan Nomor Pendaftaran & Passwordnya adalah NIS Calon Siswa yang bersangkutan.",
                "Jika dinyatakan LULUS maka Calon Siswa Wajib Daftar Ulang di AL SIDDIQ INTERNATIONAL SCHOOL."
            ],
            termItems: [
                "Setiap calon siswa wajib mengisi form pendaftaran dengan lengkap.",
                "Data-data yang diisikan pada form PPDB Online harus sesuai dengan data asli dan benar adanya.",
                "Siapkan pas foto berwarna dalam format JPG maksimal berukuran 2MB yang akan di-upload melalui form pendaftaran PPDB Online.",
                "Calon siswa yang sudah mendaftarkan secara online akan mendapatkan Nomor Pendaftaran yang harus dicetak dan dilampirkan dalam persyaratan yang diminta oleh Panitia PPDB AL SIDDIQ INTERNATIONAL SCHOOL.",
                "Calon siswa yang sudah mendaftarkan diri melalui PPDB Online AL SIDDIQ INTERNATIONAL SCHOOL akan mendapatkan Nomor Pendaftaran dan Password yang nantinya akan digunakan untuk akses informasi yang berkaitan dengan PPDB.",
                "Calon siswa yang sudah mendaftarakan diri melalui PPDB Online AL SIDDIQ INTERNATIONAL SCHOOL wajib menyerahkan dokumen persyaratan yang sudah ditentukan oleh Panitia PPDB",
                "Setiap calon siswa yang mendaftar wajib mengikuti tes seleksi yang diadakan oleh panitia PPDB AL SIDDIQ INTERNATIONAL SCHOOL.",
                "Data yang sudah diberikan ke Panitia PPDB AL SIDDIQ INTERNATIONAL SCHOOL hanya digunakan untuk keperluan penerimaan siswa baru dan data tidak akan dipublikasikan serta dijaga kerahasiaannya oleh Panita PPDB.",
            ],
            studentData: 'Data Siswa',
            parentData: 'Data Orang Tua/Wali',
            previousSchoolData: 'Data Sekolah Sebelumnya (Jika Ada)',
            confirm: 'Konfirmasi',
            required: 'Field ini wajib diisi',
            form: {
                enrollmentType: "Jenis Daftar",
                chooseLevel: "Pilih Tingkatan",
                chooseClass: "Pilih Kelas",
                nis: 'Nomor Induk Siswa (NIS)',
                nisHint: '*Isi NIS Jika Sudah Punya. Jika belum, Isi dengan kombinasi Angka (untuk dijadikan Password Login)',
                nisn: 'Nomor Induk Siswa Nasional (NISN)',
                nisnHint: 'Sesuai dengan data dari web, http://nisn.data.kemdikbud.go.id Jika belum punya, Isi dengan 001',
                nik: 'Nomor Induk Keluarga (NIK) - Siswa',
                nikHint: '*Sesuai dengan Kartu Keluarga (KK)',
                schoolDistance: "Jarak dari rumah ke sekolah",
                hobby: "Hobi",
                aspiration: "Cita - Cita",
                fullName: 'Nama Lengkap',
                fullNameHint: '*Sesuai dengan Kartu Keluarga (KK)',
                gender: 'Jenis Kelamin',
                pob: 'Tempat Kelahiran',
                dob: 'Tanggal Lahir',
                religion: 'Agama',
                familiyStatus: 'Status dalam Keluarga',
                address: 'Alamat',
                phone: 'No HP',
                phoneFormatIncorrect: 'Format Nomor Telepon Salah.',
                biological: "Anak Kandung",
                adopted: "Anak Angkat",
                father: 'Data Ayah',
                mother: 'Data Ibu',
                guardian: 'Data Wali',
                guardianForm: 'Data Wali (diisi apabila anak tidak tinggal bersama orang tua)',
                education: "Pendidikan",
                uneducated: "Tidak Sekolah",
                occupation: "Pekerjaan",
                privateEmployee: "Private Employee",
                smallTradder: "Small Trader",
                largeTradder: "Large Trader",
                farmer: "Tani",
                selfEmployed: "Wiraswasta",
                entrepreneur: "Wirausaha",
                labor: "Buruh",
                retiree: "Pensiunan",
                indonesianWorkers: "Tenaga Kerja Indonesia",
                stateOwnedEmployees: "Karyawan BUMN",
                passedAway: "Sudah Meninggal",
                otherJob: "Lainnya",
                militaryPolice: "TNI/POLRI",
                fisherman: "Nelayan",
                housewife: "Ibu Rumah Tangga",
                income: "Penghasilan",
                selectItem: "Pilih {{item}}",
                schoolNpsn: "NPSN Sekolah",
                schoolName: "Nama Sekolah",
                schoolStatus: 'Status Sekolah',
                examModel: "Model Ujian Nasional",
                schoolAdress: "Alamat Sekolah",
                yearOfGraduation: "Tahun Lulus",
            },
            next: "Lanjut",
            prev: "Kembali",
            registerNow: "Daftar Sekarang",
            validateString: 'Proses PPDB Online AL SIDDIQ INTERNATIONAL hampir selesai. Silakan periksa kembali data-data calon siswa yang sudah anda masukkan.',
            isValidString: 'Apakah data calon siswa sudah sesuai dan lengkap?',
            validate: 'Ya, data sudah sesuai dan lengkap.',
            father: 'Ayah',
            mother: 'Ibu',
            guardian: 'Wali'
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "id", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
