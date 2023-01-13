import {AsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    reducers: {},
    extraReducers: builder => {
        builder
            //entire app promises status handle,
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/rejected"),
                (state, {payload}) => {
                    state.status = "failed";
                    state.error = payload.data.error;
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = "idle";
                    state.error = null;
                }
            )
    }
});

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

