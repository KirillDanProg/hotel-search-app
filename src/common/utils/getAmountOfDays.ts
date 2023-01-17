// export const getAmountOfDays = (checkIn: string, checkOut: string, format: string): number | "incorrect format of date" => {
//     switch (format) {
//         case"yyyy-mm-dd":
//             return +checkOut.slice(-2) - +checkIn.slice(-2)
//         case"dd-mm-yyyy":
//             return +checkOut.slice(0, 2) - +checkIn.slice(0, 2)
//         default:
//             return "incorrect format of date"
//     }
// }


export function getAmountOfDays(checkIn: Date, checkOut: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;
    const start = Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
    const end = Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
    return (start - end) / oneDay;
}