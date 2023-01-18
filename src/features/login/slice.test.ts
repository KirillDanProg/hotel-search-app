import {authMe} from "./loginSlice";

describe("loginSlice",  () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("change status with 'authMe.pending' action", async () => {
        const mockData = {id: "42"}
        const dispatch = jest.fn()
        const thunk = authMe()
        jest.spyOn(localStorage, "setItem");
        localStorage.setItem = jest.fn()
        localStorage.setItem("userData", JSON.stringify(mockData))

        await thunk(dispatch, () => ({}), {})

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)

        const [start, end] = calls

        expect(start[0].type).toBe("auth/me/pending")
        expect(end[0].type).toBe("auth/me/fulfilled")
        expect(end[0].payload).toEqual(mockData)
    })

    it("returns error when no userData in localStorage 'you are not authorized'", async () => {
        const dispatch = jest.fn()
        const thunk = authMe()
        await thunk(dispatch, () => ({}), {})

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe("auth/me/pending")
        expect(end[0].type).toBe("auth/me/rejected")
        expect(end[0].payload).toEqual("you are not authorized")
    })
})