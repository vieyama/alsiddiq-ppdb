export const rupiahFormatter = (number) => {
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR"
    }).format(number);
}
