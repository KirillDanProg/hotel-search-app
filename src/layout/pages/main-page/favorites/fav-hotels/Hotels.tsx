import React from 'react';
import Box from "@mui/material/Box";
import s from "../../Main.module.scss";
import {HotelDataItem} from "./HotelDataItem";
import {useFetchHotelsQuery} from "../../../../../features/hotels/hotelsAPI";
import {useQueryParams} from "../../../../../common/hooks/useQueryParams";
import {getUrlParams} from "../../../../../common/utils/getUrlParams copy";

export const Hotels = () => {

    const [searchParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const {data} = useFetchHotelsQuery(params)

    const checkIn = searchParams.get("checkIn") || String(new Date().toUTCString().slice(0, 16))

    return (
        <Box className={s.hotelsContainer}>
            {
              data && data.map(hotel => {
                    return (
                        <HotelDataItem key={hotel.hotelId}
                                       data={hotel}
                                       checkIn={checkIn}
                        />
                    )
                })
            }
        </Box>
    );
};

