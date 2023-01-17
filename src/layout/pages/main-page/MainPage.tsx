import React from 'react';
import Box from "@mui/material/Box";
import commonS from "common/styles/CommonStyles.module.scss"
import {HotelSearch} from "./hotel-search";
import {HotelsContent} from "./hotels-results";
import {Favorites} from "./favorites";
import s from "./Main.module.scss"
import {Header} from "layout/header";

export const MainPage = () => {
    return (
        <>
            <Header/>
            <Box className={commonS.container}>
                <Box className={s.flexContainer}>
                    <Box className={s.sideFlexItem}>
                        <HotelSearch/>
                        <Favorites/>
                    </Box>
                    <Box className={s.mainFlexItem}>
                        <HotelsContent/>
                    </Box>
                </Box>
            </Box>
        </>

    );
};
