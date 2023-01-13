import React from 'react';
import Box from "@mui/material/Box";
import s from "../../Main.module.scss";
import {HotelDataItem} from "./HotelDataItem";

export const Hotels = () => {
    return (
        <Box className={s.hotelsContainer}>
            <HotelDataItem/>
            <HotelDataItem/>
            <HotelDataItem/>
        </Box>
    );
};

