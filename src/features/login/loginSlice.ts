import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

export const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
