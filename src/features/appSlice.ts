import {createSlice} from "@reduxjs/toolkit";
import {AppStatusType} from "./login/loginSlice";
import {GenericAsyncThunk} from "./hotels/hotelsSlice";

export const initialState = {
    error: null as string | null,
    status: "idle" as AppStatusType,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
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
                    if (typeof payload === "object") {
                        state.error = payload.data.message
                    } else {
                        state.error = payload
                    }
                    state.status = "failed";
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


export const {resetError} = appSlice.actions