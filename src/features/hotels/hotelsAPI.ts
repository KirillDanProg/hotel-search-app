import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const hotelsAPI = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://engine.hotellook.com/api/v2/",
    }),
    endpoints: (build) => ({
        fetchHotels: build.query<HotelResponseType[], ParamsType>({
            query: (params) => ({
                url: `cache.json`,
                method: "GET",
                params
            }),
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
