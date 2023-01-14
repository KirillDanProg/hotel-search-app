import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {IconButton, Rating, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import s from "../../Main.module.scss"
import {HotelResponseType} from "features/hotels/hotelsAPI";
import {useAppDispatch, useAppSelector} from "common/hooks/redux-hooks";
import {addHotelToFavorites} from "features/hotels/hotelsSlice";
import {selectFavoritesHotels} from "app/selectors";

type PropsType = {
    data: HotelResponseType
    checkIn: string
}
export const HotelDataItem: FC<PropsType> = ({data, checkIn}) => {
    const dispatch = useAppDispatch()
    const favoritesHotelsIds = useAppSelector(selectFavoritesHotels)
    const addHotelToFavorite = () => {
        dispatch(addHotelToFavorites(data.hotelId))
    }

    const activeColor = favoritesHotelsIds.includes(data.hotelId)

    return (
        <Box className={s.hotelDataItemContainer}>
            <Typography className={s.hotelName}>
                {data.hotelName}
            </Typography>
            <Typography className={s.date}>
                <span>{checkIn}</span>
                -
                <span>1 day</span>
            </Typography>

            <Box className={s.rateAndPriceContainer}>
                <Rating name="simple-controlled" value={data.stars}/>
                <Typography className={s.price}>
                    <span>price:</span>{/*todo: fix: currency*/}{data.priceFrom} &#x24;
                </Typography>
            </Box>

            <IconButton onClick={addHotelToFavorite} className={s.favIcon}>
                <FavoriteIcon style={ activeColor ? { fill: "#E55858"} : {fill : "#00000080"} }/>
            </IconButton>
        </Box>
    )
}
