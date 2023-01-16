import React from 'react';
import Box from "@mui/material/Box";
import commonS from "common/styles/CommonStyles.module.scss"
import {HotelSearch} from "./hotel-search/HotelSearch";
import {Favorites} from "./favorites/Favorites";
import {HotelsContent} from "./hotels-results/HotelsContent";
import s from "./Main.module.scss"
import {Header} from "../../header/Header";

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
