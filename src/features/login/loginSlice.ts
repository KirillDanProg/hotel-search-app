import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CounterState {
    login: string | null
    error: string | null
    status: "idle" | "loading" | "failed";
}

export const initialState: CounterState = {
    login: null,
    error: null,
    status: "idle",
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.login = action.payload
        },
        logout: (state) => {
            state.login = null
        }
    },
});

export const {login, logout} = loginSlice.actions


