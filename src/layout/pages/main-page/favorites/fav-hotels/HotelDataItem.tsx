import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {IconButton, Rating, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import s from "../../Main.module.scss"
import {HotelResponseType} from "features/hotels/hotelsAPI";

type PropsType = {
    data: HotelResponseType
    checkIn: string
}
export const HotelDataItem: FC<PropsType> = ({data, checkIn}) => {
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

            <IconButton className={s.favIcon}>
                <FavoriteIcon style={{fill: "#E55858"}}/>
            </IconButton>
        </Box>
    )
}
