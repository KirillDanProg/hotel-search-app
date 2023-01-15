import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage} from "../../common/utils/local-storage copy";
import {v4} from "uuid"
import {GenericAsyncThunk} from "../hotels/hotelsSlice";

// export type InitialStateType = typeof initialState

export const initialState = {
    userData: {} as UserDataType,
    isAuth: false,
    error: "",
    status: "idle" as AppStatusType,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                const id = v4()
                state.userData = {login: action.payload, id}
                state.isAuth = true
                const userPreference = {id, favoritesHotels: []}
                saveToLocalStorage("userData", userPreference)
            }
        },
        logout: (state) => {
            removeFromLocalStorage("userData")
            state.isAuth = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(authMe.pending, (state) => {
                state.status = "loading"
            })
            .addCase(authMe.fulfilled, (state, {payload}) => {
                state.isAuth = true
                state.status = "idle"
                state.userData.id = payload.id
            })
            .addCase(authMe.rejected, (state, {payload}) => {
                state.isAuth = false
                state.error = payload as string
                state.status = "failed"
            })
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/rejected"),
                (state, {payload}) => {
                    if (typeof payload === "object") {
                        state.error = payload.data.message
                        state.status = "failed";
                    } else {
                        state.status = "failed";
                        state.error = payload
                    }
                }
            )
    }
});

export const authMe = createAsyncThunk("auth/me", (arg, thunkAPI) => {
    const userData: {id: string} = getFromLocalStorage("userData")
    if (userData) {
        return userData
    }
    return thunkAPI.rejectWithValue("you are not authorized")
})

export const {login, logout} = loginSlice.actions

export type UserDataType = {
    id: string | null
    login: string | null
}

export type AppStatusType = "idle" | "loading" | "failed"
