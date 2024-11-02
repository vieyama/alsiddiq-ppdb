export const convertStatus = (status) => {
    switch (status) {
        case 'waiting-for-verification':
            return { text: 'Belum Diverifikasi', badgeType: 'badge-accent' }
        case 'verified':
            return { text: 'Terverifikasi', badgeType: 'badge-primary' }
        case 'passed':
            return { text: 'Lulus', badgeType: 'badge-primary' }
        case 'not_passed':
            return { text: 'Tidak Lulus', badgeType: 'badge-accent' }
        default:
            return { text: 'Belum Diverifikasi', badgeType: 'badge-accent' }
    }
}

export const convertStatusForAnnouncemenet = (status) => {
    switch (status) {
        case 'passed':
            return { text: 'Lulus', badgeType: 'badge-primary' }
        case 'not_passed':
            return { text: 'Tidak Lulus', badgeType: 'badge-accent' }
        default:
            return { text: 'Proses', badgeType: 'badge-accent' }
    }
}
