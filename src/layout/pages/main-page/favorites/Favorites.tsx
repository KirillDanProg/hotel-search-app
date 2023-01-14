import React from 'react';
import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Typography} from "@mui/material";
import s from "../Main.module.scss"
import {SortControllers} from "./sort-controlers/SortControllers";
import {useFetchHotelsQuery} from "../../../../features/hotels/hotelsAPI";
import {useQueryParams} from "../../../../common/hooks/useQueryParams";
import {getUrlParams} from "../../../../common/utils/getUrlParams copy";
import {useAppSelector} from "../../../../common/hooks/redux-hooks";
import {selectFavoritesHotels} from "../../../../app/selectors";
import {HotelDataItem} from "./fav-hotels/HotelDataItem";

export const Favorites = () => {
    const [searchParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const favoritesHotelsIds = useAppSelector(selectFavoritesHotels)
    const {data = []} = useFetchHotelsQuery(params)
    const checkIn = searchParams.get("checkIn") || String(new Date().toUTCString().slice(0, 16))

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
                    data.map(hotel => favoritesHotelsIds.includes(hotel.hotelId)
                    ? <HotelDataItem data={hotel} checkIn={checkIn}/>
                    : "")}
            </Box>
        </Box>
    );
};
