export const getAmountOfDays = (checkIn: string, checkOut: string): number => {
    return +checkOut.slice(-2) - +checkIn.slice(-2)
}