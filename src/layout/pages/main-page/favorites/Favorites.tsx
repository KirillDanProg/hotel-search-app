import React from 'react';
import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Typography} from "@mui/material";
import s from "../Main.module.scss"
import {SortControllers} from "./sort-controlers/SortControllers";
import {Hotels} from "./fav-hotels/Hotels";

export const Favorites = () => {
    return (
        <Box sx={boxStyle} className={s.sortControllersContainer}>
            <Typography component={"h3"}
                        variant={"subtitle2"}
                        className={s.subTitle}>
                Favorites
            </Typography>

            <SortControllers/>

            {/*todo: fix inline styles*/}
            <Hotels/>
        </Box>
    );
};
