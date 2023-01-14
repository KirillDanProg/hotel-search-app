import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage} from "../../common/utils/local-storage copy";

export interface CounterState {
    login: string | null
    isAuth: boolean
    error: string | null
    status: "idle" | "loading" | "failed";
}

export const initialState: CounterState = {
    login: null,
    isAuth: false,
    error: null,
    status: "idle",
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.login = action.payload
            state.isAuth = true
            if (action.payload) {
                saveToLocalStorage("isAuth", 1)
            }
        },
        logout: (state) => {
            removeFromLocalStorage("isAuth")
            state.isAuth = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(authMe.pending, (state) => {
                state.status = "loading"
            })
            .addCase(authMe.fulfilled, (state) => {
                state.isAuth = true
                state.status = "idle"
            })
            .addCase(authMe.rejected, (state, {payload}) => {
                state.isAuth = false
                state.error = payload as string
                state.status = "failed"
            })

    }
});

export const authMe = createAsyncThunk("auth/me", (arg, thunkAPI) => {
    const id: string = getFromLocalStorage("isAuth")
    if (id) {
        return true
    }
    return thunkAPI.rejectWithValue("you are not authorized")
})

export const {login, logout} = loginSlice.actions


