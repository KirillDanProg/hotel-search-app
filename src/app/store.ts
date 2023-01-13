import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {loginSlice} from "../features/login/loginSlice";
import {hotelsAPI} from "../features/hotels/hotelsAPI";

export const store = configureStore({
  reducer: {
    auth: loginSlice.reducer,
    [hotelsAPI.reducerPath]: hotelsAPI.reducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(hotelsAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
