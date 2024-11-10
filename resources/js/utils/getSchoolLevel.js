export const getSchoolLevel = (level) => {
    switch (level) {
        case 'tk':
            return 'Taman Kanak - Kanak (TK)'
        case 'sd':
            return 'Sekolah Dasar (SD)'
        case 'smp':
            return 'Sekolah Menengah Pertama (SMP)'
        default:
            break;
    }
}
