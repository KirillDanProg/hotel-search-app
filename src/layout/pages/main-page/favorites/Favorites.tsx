import React from 'react';
import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Typography} from "@mui/material";
import s from "../Main.module.scss"
import {SortControllers} from "./sort-controlers/SortControllers";
import {useFetchHotelsQuery} from "features/hotels/hotelsAPI";
import {useQueryParams} from "common/hooks/useQueryParams";
import {getUrlParams} from "common/utils/getUrlParams copy";
import {useAppSelector} from "common/hooks/redux-hooks";
import {selectFavoritesHotels} from "app/selectors";
import {HotelDataItem} from "./fav-hotels/HotelDataItem";
import {EmptyListMessage} from "common/components/EmptyListMessage";
import {getFormattedDate} from "common/utils/getFormattedDate";

export const Favorites = () => {
    const [searchParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const favoritesHotelsIds = useAppSelector(selectFavoritesHotels)
    const {data = []} = useFetchHotelsQuery(params)
    const checkIn = searchParams.get("checkIn") || String(getFormattedDate(new Date, "toUTCString"))

    const sortBy = searchParams.get("sort")
    let sortedData = [...data]

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

    const mappedHotels = sortedData.map(hotel => favoritesHotelsIds.includes(hotel.hotelId)
        ? <HotelDataItem key={hotel.hotelId} data={hotel} checkIn={checkIn}/>
        : "")

    return (
        <Box sx={boxStyle} className={s.sortControllersContainer}>
            <Typography component={"h3"}
                        variant={"subtitle2"}
                        className={s.subTitle}>
                Favorites
            </Typography>

            <SortControllers/>

            <Box className={s.hotelsContainer}>
                {
                    favoritesHotelsIds.length > 0
                        ? mappedHotels
                        : <EmptyListMessage message={"no favorites hotels yet"}/>
                }
            </Box>
        </Box>
    );
};
