import {RootState} from "./store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAppError = (state: RootState) => state.auth.error
export const selectAppStatus = (state: RootState) => state.auth.status

export const selectFavoritesHotels = (state: RootState) => state.hotels.favoritesHotels
export const selectHotelData = (state: RootState) => state.hotels.data
export const selectHotelsImages = (state: RootState) => state.hotels.hotelsImages
export const selectFavoritesHotelsData = (state: RootState) => state.hotels.favoritesHotelsData
