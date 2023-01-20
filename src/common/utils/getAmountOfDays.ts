export function getAmountOfDays(checkIn: Date, checkOut: Date): number | undefined {
    const oneDay = 1000 * 60 * 60 * 24;
    const start = Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
    const end = Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
    const result = (start - end) / oneDay;
    if (result >= 0) return result
}