import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const hotelsAPI = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://engine.hotellook.com/api/v2/",
    }),
    tagTypes: ["Hotels"],
    endpoints: (build) => ({
        fetchHotels: build.query<HotelResponseType[], ParamsType>({
            query: (params) => ({
                url: `cache.json`,
                method: "GET",
                params
            }),
            // todo: sorting hotels for main fetching in <Hotels/> component
            // transformResponse(returnValue: HotelResponseType[], meta, arg) {
            //     switch (arg.sort) {
            //         case "priceAsc":
            //             return returnValue.sort((a, b) => a.priceFrom - b.priceFrom)
            //         case "priceDesc":
            //             return returnValue.sort((a, b) => b.priceFrom - a.priceFrom)
            //         case "rateAsc":
            //             return returnValue.sort((a, b) => a.stars - b.stars)
            //         case "rateDesc":
            //             return returnValue.sort((a, b) => b.stars - a.stars)
            //         default:
            //             return returnValue
            //     }
            // }
        }),
        fetchHotel: build.query<HotelResponseType[], ParamsType>({
            query: (params) => ({
                url: "cache.json",
                method: "GET",
                params
            }),
        }),
    }),
})

export const {useFetchHotelsQuery, useLazyFetchHotelsQuery, useLazyFetchHotelQuery} = hotelsAPI

export type HotelResponseType = {
    location: LocationType
    priceAvg: number
    hotelName: string
    stars: number
    locationId: number
    hotelId: number
    priceFrom: number
}

type LocationType = {
    country: string
    name: string
    state?: string
    geo: {
        lon: string
        lat: string
    }
}

export type ParamsType = {
    location?: string
    checkIn: string
    checkOut: string
    hotel?: string
    adults?: string
    lookFor?: "city" | "hotel" | "both"
    limit?: string
    hotelId?: string
    sort?: string
}
