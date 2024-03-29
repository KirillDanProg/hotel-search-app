import React, {useEffect} from 'react';
import {boxStyle} from "common/styles";
import {Typography} from "@mui/material";
import {getFormattedDate} from "common/utils";
import {useLazyFetchHotelQuery} from "features/hotels/hotelsAPI";
import {memoizedHotelsIds, selectFavoritesHotelsData, selectHotelData} from "app/selectors";
import {addHotelDataToFav, resetFavoritesHotelsData} from "features/hotels/hotelsSlice";
import {PreloaderContainer, SkeletonLoader, EmptyListMessage} from "common/components";
import {useAppDispatch, useAppSelector, useQueryParams} from "common/hooks";
import {SortControllers} from "./sort-controlers";
import {HotelDataItem} from "./fav-hotels";
import s from "../Main.module.scss"
import Box from "@mui/material/Box";


export const Favorites = () => {
    const dispatch = useAppDispatch()
    const favoritesHotelsData = useAppSelector(selectFavoritesHotelsData)
    const [searchParams] = useQueryParams()
    const favoritesHotelsIds = useAppSelector(memoizedHotelsIds)
    const checkIn = searchParams.get("checkIn") || String(getFormattedDate(new Date, "toUTCString"))
    const [fetchHotel, {isFetching}] = useLazyFetchHotelQuery()
    const date = new Date()
    const todayDate = getFormattedDate(date, 'toISOString')
    const tomorrowDate = getFormattedDate(new Date(date.getTime() + 24 * 60 * 60 * 1000), 'toISOString')

    useEffect(() => {
        dispatch(resetFavoritesHotelsData())
        favoritesHotelsIds.forEach(async (hotelId) => {
            const params = {
                hotelId: String(hotelId),
                checkIn: todayDate,
                checkOut: tomorrowDate
            }
            console.log(new Date())
            const data: any = await fetchHotel(params)
            if (data) {
                dispatch(addHotelDataToFav(data.data))
            }
        })
    }, [favoritesHotelsIds])

    const amountOfDays = useAppSelector(selectHotelData).amountOfDays
    const sortBy = searchParams.get("sort")
    let sortedData = [...favoritesHotelsData]

    if (sortBy) {
        switch (sortBy) {
            case "priceAsc":
                sortedData.sort((a, b) => a.priceFrom - b.priceFrom)
                break;
            case "priceDesc":
                sortedData.sort((a, b) => b.priceFrom - a.priceFrom)
                break;
            case "rateAsc":
                sortedData.sort((a, b) => a.stars - b.stars)
                break;
            case "rateDesc":
                sortedData.sort((a, b) => b.stars - a.stars)
                break;
        }
    }

    const mappedHotels = sortedData.map((hotel: any) => favoritesHotelsIds.includes(hotel.hotelId)
        ? <HotelDataItem key={hotel.hotelId} data={hotel} checkIn={checkIn} amountOfDays={amountOfDays}/>
        : "")

    return (
        <Box sx={boxStyle} className={s.sortControllersContainer}>
            <Typography component={"h3"}
                        variant={"subtitle2"}
                        className={s.subTitle}>
                Favorites
            </Typography>

            <SortControllers/>

            <Box className={s.hotelsContainer} sx={{alignSelf: "flex-start"}}>
                <PreloaderContainer condition={isFetching} loader={<SkeletonLoader n={favoritesHotelsIds.length}/>}>
                    {
                        favoritesHotelsIds.length > 0
                            ? mappedHotels
                            : <EmptyListMessage message={"no favorites hotels yet"}/>
                    }
                </PreloaderContainer>
            </Box>
        </Box>
    );
};
