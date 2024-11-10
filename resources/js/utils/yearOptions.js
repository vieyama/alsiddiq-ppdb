export const yearsOptions = (currentRegistrationYear) => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const yearsList = [];

    for (let i = 0; i <= 10; i++) {
        yearsList.push((currentRegistrationYear >= nextYear ? currentRegistrationYear : nextYear) - i);
    }

    return yearsList;
}
