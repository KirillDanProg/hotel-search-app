import {loginSlice} from "../features/login/loginSlice";
import {hotelsAPI} from "../features/hotels/hotelsAPI";
import {hotelsSlice} from "../features/hotels/hotelsSlice";
import {appSlice} from "../features/appSlice";

import {
    combineReducers,
    configureStore,
    PreloadedState
} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    app: appSlice.reducer,
    auth: loginSlice.reducer,
    hotels: hotelsSlice.reducer,
    [hotelsAPI.reducerPath]: hotelsAPI.reducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development',
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(hotelsAPI.middleware),
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']


//
// import { configureStore } from "@reduxjs/toolkit";
// import {loginSlice} from "../features/login/loginSlice";
// import {hotelsAPI} from "../features/hotels/hotelsAPI";
// import {hotelsSlice} from "../features/hotels/hotelsSlice";
// import {appSlice} from "../features/appSlice";
//
// export const store = configureStore({
//     reducer: {
//         app: appSlice.reducer,
//         auth: loginSlice.reducer,
//         hotels: hotelsSlice.reducer,
//         [hotelsAPI.reducerPath]: hotelsAPI.reducer
//     },
//     devTools: process.env.NODE_ENV === 'development',
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(hotelsAPI.middleware),
// });
//
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
