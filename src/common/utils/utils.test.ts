import {getAmountOfDays} from "./getAmountOfDays";

it("returns the number of days between two dates", () => {
    const checkIn = "2022-01-21"
    const checkOut = "2022-01-31"
    const result = getAmountOfDays(new Date(checkIn), new Date(checkOut))
    expect(result).toBe(10)
})


