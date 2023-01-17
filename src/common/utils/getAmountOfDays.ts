export const getAmountOfDays = (checkIn: string, checkOut: string, format: string): number | "incorrect format of date" => {
    switch (format) {
        case"yyyy-mm-dd":
            return +checkOut.slice(-2) - +checkIn.slice(-2)
        case"dd-mm-yyyy":
            return +checkOut.slice(0, 2) - +checkIn.slice(0, 2)
        default:
            return "incorrect format of date"
    }
}