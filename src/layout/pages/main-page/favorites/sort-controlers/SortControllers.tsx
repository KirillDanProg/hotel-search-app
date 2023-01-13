import React from 'react';
import {TableSortLabel} from "@mui/material";
import Box from "@mui/material/Box";
import s from "./../../Main.module.scss"

export const SortControllers = () => {
    return (
        <Box className={s.sortControllers}>
            <TableSortLabel direction={"desc"}
                            hideSortIcon={false}
                            sx={sortLabelStyle}
                            className={s.sortItem}>Rate</TableSortLabel

            >
            <TableSortLabel direction={"desc"}
                            hideSortIcon={false}
                            sx={sortLabelStyle}
                            className={s.sortItem}>Price</TableSortLabel>
        </Box>
    );
};

const sortLabelStyle = {
    '&.MuiTableSortLabel-root': {
        color: "#000",
        opacity: "0.5"
    },
    '&.MuiTableSortLabel-root:focus': {
        opacity: "1"
    },
    '& .MuiTableSortLabel-icon': {
        opacity: "1",
    },
}