import React from 'react';
import Box from "@mui/material/Box";
import {IconButton, Rating, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import s from "../../Main.module.scss"

export const HotelDataItem = () => {
    return (
        <Box className={s.hotelDataItemContainer}>
            <Typography className={s.hotelName}>
                Hotel Name
            </Typography>
            <Typography className={s.date}>
                <span>28 June, 2020</span>
                -
                <span>1 day</span>
            </Typography>

            <Box className={s.rateAndPriceContainer}>
                <Rating name="simple-controlled" value={3}/>
                <Typography className={s.price}>
                    <span>price:</span>{/*todo: fix: currency*/}2 924 &#x24;
                </Typography>
            </Box>

            <IconButton className={s.favIcon}>
                <FavoriteIcon style={{fill: "#E55858"}}/>
            </IconButton>
        </Box>
    )
}
