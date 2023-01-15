import {RootState} from "./store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAppStatus = (state: RootState) => state.auth.status
export const selectFavoritesHotels = (state: RootState) => state.hotels.favoritesHotels
export const selectAppError = (state: RootState) => state.auth.error
export const selectHotelData = (state: RootState) => state.hotels.data
