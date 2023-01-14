import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppStatusType, authMe} from "../login/loginSlice";
import {getFromLocalStorage, saveToLocalStorage} from "../../common/utils/local-storage copy";


export const initialState = {
    favoritesHotels: [] as number[],
    error: null as string | null,
    status: "idle" as AppStatusType
};

export const addHotelToFavorites = createAsyncThunk("hotels/addHotelToFavorites", (arg: number) => {
    const dataFromLocalStorage = getFromLocalStorage("userData")
    let favoritesHotels = []
    if (dataFromLocalStorage.favoritesHotels.includes(arg)) {
        favoritesHotels = dataFromLocalStorage.favoritesHotels.filter((el: number) => el !== arg)
    } else {
        favoritesHotels = [...dataFromLocalStorage.favoritesHotels, arg]
    }
    saveToLocalStorage("userData", {...dataFromLocalStorage, favoritesHotels})
    return favoritesHotels
})

export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<number>) => {
            if (state.favoritesHotels.includes(action.payload)) {
                state.favoritesHotels = state.favoritesHotels.filter(el => el !== action.payload)
            } else {
                state.favoritesHotels.push(action.payload)
            }
        }
    },
    extraReducers: builder => {
        builder
            //entire app promises status handle,
            .addCase(authMe.fulfilled, (state) => {
                const user = getFromLocalStorage("userData")
                if (user) {
                    state.favoritesHotels = user.favoritesHotels
                }
            })
            .addCase(addHotelToFavorites.fulfilled, (state, {payload}) => {
                state.favoritesHotels = payload
            })
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
                    debugger
                    state.status = "failed";
                    state.error = payload
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

export const {addToFavorites} = hotelsSlice.actions
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
