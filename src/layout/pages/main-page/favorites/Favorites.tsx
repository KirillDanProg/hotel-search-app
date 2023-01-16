import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Typography} from "@mui/material";
import s from "../Main.module.scss"
import {SortControllers} from "./sort-controlers/SortControllers";
import { useLazyFetchHotelQuery} from "features/hotels/hotelsAPI";
import {useQueryParams} from "common/hooks/useQueryParams";
import {useAppDispatch, useAppSelector} from "common/hooks/redux-hooks";
import {memoizedHotelsIds, selectFavoritesHotelsData, selectHotelData} from "app/selectors";
import {HotelDataItem} from "./fav-hotels/HotelDataItem";
import {EmptyListMessage} from "common/components/EmptyListMessage";
import {getFormattedDate} from "common/utils/getFormattedDate";
import {SkeletonContainer} from "common/components/preloader/SkeletonItem";
import {addHotelDataToFav, resetFavoritesHotelsData} from "features/hotels/hotelsSlice";

export const Favorites = () => {
    const dispatch = useAppDispatch()
    const favoritesHotelsData = useAppSelector(selectFavoritesHotelsData)
    const [searchParams] = useQueryParams()
    const favoritesHotelsIds = useAppSelector(memoizedHotelsIds)
    const checkIn = searchParams.get("checkIn") || String(getFormattedDate(new Date, "toUTCString"))
    const [fetchHotel, { isFetching}] = useLazyFetchHotelQuery()

    useEffect(() => {
        dispatch(resetFavoritesHotelsData())
        favoritesHotelsIds.forEach(async (hotelId) => {
            const params = {
                hotelId: String(hotelId),
                checkIn: "2023-01-16",
                checkOut: "2023-01-17"
            }
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

            <Box className={s.hotelsContainer} sx={{alignSelf: "flex-start"}} >
                {
                    isFetching ? <SkeletonContainer n={favoritesHotelsIds.length}/>
                        : favoritesHotelsIds.length > 0
                            ? mappedHotels
                            : <EmptyListMessage message={"no favorites hotels yet"}/>
                }
            </Box>
        </Box>
    );
};
