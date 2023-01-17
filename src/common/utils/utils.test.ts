import {getAmountOfDays} from "./getAmountOfDays";

describe("get amount of days", () => {
    it("returns correct number of days in format: dd-mm-yyyy", () => {
        const checkIn = "01-12-2022"
        const checkOut = "13-12-2022"
        const result = getAmountOfDays(checkIn, checkOut, "dd-mm-yyyy")
        expect(result).toBe(12)
    })

    it("returns correct number of days in format: yyyy-mm-dd", () => {
        const checkIn = "2022-01-21"
        const checkOut = "2022-01-31"
        const result = getAmountOfDays(checkIn, checkOut, "yyyy-mm-dd")
        expect(result).toBe(10)
    })

    it("returns undefined when format incorrect", () => {
        const checkIn = "2022-01-21"
        const checkOut = "2022-01-31"
        const result = getAmountOfDays(checkIn, checkOut, "incorrect format")
        expect(result).toBe("incorrect format of date")
    })
})


