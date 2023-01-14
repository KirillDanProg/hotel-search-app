import React from 'react';
import Box from "@mui/material/Box";
import s from "../../Main.module.scss";
import {HotelDataItem} from "./HotelDataItem";
import {useFetchHotelsQuery} from "features/hotels/hotelsAPI";
import {useQueryParams} from "common/hooks/useQueryParams";
import {getUrlParams} from "common/utils/getUrlParams copy";
import {SkeletonContainer} from "common/components/preloader/SkeletonItem";
import {EmptyListMessage} from "common/components/EmptyListMessage";
import {getFormattedDate} from "common/utils/getFormattedDate";

export const Hotels = () => {

    const [searchParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const {data, isLoading} = useFetchHotelsQuery(params)
    const checkIn = searchParams.get("checkIn") || String(getFormattedDate(new Date, "toUTCString"))

    const mappedHotels = data && data.map(hotel => <HotelDataItem key={hotel.hotelId}
                                                                  data={hotel}
                                                                  checkIn={checkIn}/>)

    return (
        <Box className={s.hotelsContainer}>
            {
                isLoading
                    ? <SkeletonContainer/>
                    : data && data.length > 0 ?
                        mappedHotels
                        : <EmptyListMessage message="no results"/>
            }
        </Box>
    );
};

