import {getAmountOfDays} from "./getAmountOfDays";
import {getUrlParams} from "./getUrlParams";

describe("getAmountOfDays", () => {
    it("returns the number of days between two dates", () => {
        const checkIn = "2022-01-21"
        const checkOut = "2022-01-31"
        const result = getAmountOfDays(new Date(checkIn), new Date(checkOut))
        expect(result).toBe(10)
    })

    it("returns error message", () => {
        const checkIn = "2022-01-21"
        const checkOut = "2022-01-11"
        const result = getAmountOfDays(new Date(checkIn), new Date(checkOut))
        expect(result).toBeUndefined()
    })
})


describe("getUrlParamsObject", () => {{
    it("returns object of params from url", () => {
        const testParams = {
            location: "moscow",
            checkIn: "2020-10-10",
            checkOut: "2020-11-11",
            limit: "3"
        }
        const searchParams = new URLSearchParams(testParams);
        const result  = getUrlParams(searchParams)
        expect(result).toEqual(testParams)
    })
}})