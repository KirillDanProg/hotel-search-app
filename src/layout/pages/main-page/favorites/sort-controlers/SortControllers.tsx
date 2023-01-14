import React, {useEffect, useState} from 'react';
import {TableSortLabel} from "@mui/material";
import Box from "@mui/material/Box";
import s from "../../Main.module.scss"
import {useQueryParams} from "common/hooks/useQueryParams";
import {useAppSelector} from "../../../../../common/hooks/redux-hooks";
import {selectFavoritesHotels} from "../../../../../app/selectors";

export const SortControllers = () => {
    const [searchParams, setParams] = useQueryParams()
    const initialSortValue = searchParams.get("sort") || ""
    const [sortValue, setSortValue] = useState(initialSortValue)
    const [sortDirect, setSortDirect] = useState<"Asc" | "Desc">("Asc")

    const favoritesHotels = useAppSelector(selectFavoritesHotels)

    const sortHotelsHandler = (sortByValue: string) => {
        setSortDirect(sortDirect === "Asc" ? "Desc" : "Asc")
        setSortValue(sortByValue + sortDirect)
    }

    useEffect(() => {
        if (sortValue) {
            setParams("sort", sortValue)
        }
    }, [sortValue])

    return (
        <Box className={s.sortControllers}>
            <TableSortLabel direction={sortValue === "rateAsc" ? "asc" : "desc"}
                            hideSortIcon={false}
                            sx={sortLabelStyle}
                            className={s.sortItem}
                            onClick={() => sortHotelsHandler("rate")}
                            disabled={favoritesHotels.length < 1}
            >
                Rate
            </TableSortLabel

            >
            <TableSortLabel direction={sortValue === "priceAsc" ? "asc" : "desc"}
                            hideSortIcon={false}
                            sx={sortLabelStyle}
                            className={s.sortItem}
                            onClick={() => sortHotelsHandler("price")}
                            disabled={favoritesHotels.length < 1}
            >
                Price
            </TableSortLabel>
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