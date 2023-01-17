import React, {FC} from 'react';
import {IconButton, Rating, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {addHotelToFavorites} from "features/hotels/hotelsSlice";
import {HotelResponseType} from "features/hotels/hotelsAPI";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {selectFavoritesHotels} from "app/selectors";
import defaultHotelImg from "assets/images/defaultHotelImage.png"
import s from "../../Main.module.scss"
import Box from "@mui/material/Box";

type PropsType = {
    data: HotelResponseType
    checkIn: string
    amountOfDays?: number
    withImg?: boolean
}

export const HotelDataItem: FC<PropsType> = ({data, checkIn, amountOfDays, withImg}) => {
    const dispatch = useAppDispatch()
    const favoritesHotelsIds = useAppSelector(selectFavoritesHotels)
    const addHotelToFavorite = () => {
        dispatch(addHotelToFavorites(data.hotelId))
    }

    const activeColor = favoritesHotelsIds.includes(data.hotelId)

    return (
        <Box className={s.hotelDataItemContainer}>
            {
                withImg && <Box component={"img"} src={defaultHotelImg} sx={defaultImgStyle}></Box>
            }
            <Box sx={{width: "100%"}}>
                <Typography className={s.hotelName}>
                    {data.hotelName}
                </Typography>
                <Typography className={s.date}>
                    <span>{checkIn}</span>
                    -
                    <span>{amountOfDays} day</span>
                </Typography>

                <Box className={s.rateAndPriceContainer}>
                    <Rating name="simple-controlled" value={data.stars} readOnly/>
                    <Typography className={s.price}>
                        <span>price:</span>{/*todo: fix: currency*/}{data.priceFrom} &#x24;
                    </Typography>
                </Box>

                <IconButton onClick={addHotelToFavorite} className={s.favIcon}>
                    <FavoriteIcon style={activeColor ? {fill: "#E55858"} : {fill: "#00000080"}}/>
                </IconButton>
            </Box>
        </Box>
    )
}

const defaultImgStyle = {
    width: "80px",
    borderRadius: "5px",
    alignSelf: "center"
}