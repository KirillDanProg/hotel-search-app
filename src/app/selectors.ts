import {RootState} from "./store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAppStatus = (state: RootState) => state.auth.status
