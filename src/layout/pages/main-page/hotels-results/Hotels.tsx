import React, {useEffect, useRef} from 'react';
import Box from "@mui/material/Box";
import s from "../Main.module.scss";
import {HotelDataItem} from "../favorites/fav-hotels/HotelDataItem";
import {useFetchHotelsQuery} from "features/hotels/hotelsAPI";
import {useQueryParams} from "common/hooks/useQueryParams";
import {getUrlParams} from "common/utils/getUrlParams copy";
import {SkeletonContainer} from "common/components/preloader/SkeletonItem";
import {EmptyListMessage} from "common/components/EmptyListMessage";
import {getFormattedDate} from "common/utils/getFormattedDate";
import {getAmountOfDays} from "common/utils/getAmountOfDays";
import {useAppDispatch, useAppSelector} from "common/hooks/redux-hooks";
import {selectHotelData} from "app/selectors";
import {setData} from "features/hotels/hotelsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import {Preloader} from "common/components/preloader/Preloader";

export const Hotels = () => {
    const amountOfDays = useAppSelector(selectHotelData).amountOfDays
    const dispatch = useAppDispatch()
    const [searchParams, setParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const {data, isLoading} = useFetchHotelsQuery(params)
    const location = searchParams.get("location")
    const checkIn = searchParams.get("checkIn") || String(getFormattedDate(new Date, "toUTCString"))
    const checkOut = searchParams.get("checkOut") || String(getFormattedDate(new Date, "toUTCString"))
    const limit = searchParams.get("limit") || "5"
    const ref = useRef<HTMLInputElement>(null)

    const loadMoreHandler = () => {
        setParams("limit", String(+limit + 10))
    }
    const mappedHotels = data && data.map(hotel => <HotelDataItem key={hotel.hotelId}
                                                                  data={hotel}
                                                                  checkIn={checkIn}
                                                                  amountOfDays={amountOfDays}
                                                                  withImg
    />)

    useEffect(() => {
        const amountOfDays = getAmountOfDays(checkIn, checkOut)
        dispatch(setData({amountOfDays}))
    }, [checkIn, checkOut])


    useEffect(() => {
        if (ref.current) {
            ref && ref.current.scrollIntoView()
        }
    }, [location])


    return (
        <InfiniteScroll
            height={"60vh"}
            dataLength={mappedHotels && mappedHotels.length || 5}
            next={loadMoreHandler}
            hasMore={true}
            loader={<Preloader pure/>}
            className={s.scrollContainer}
        >
            <Box ref={ref} sx={{alignSelf: "start"}} className={s.hotelsContainer}>

                {
                    isLoading
                        ? <SkeletonContainer/>
                        : data && data.length > 0 ?
                            mappedHotels
                            : <EmptyListMessage message="no results"/>
                }
            </Box>
        </InfiniteScroll>
    );
};

