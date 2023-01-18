import React, {useEffect, useRef} from 'react';
import {useFetchHotelsQuery} from "features/hotels/hotelsAPI";
import {setData} from "features/hotels/hotelsSlice";
import {useAppDispatch, useAppSelector, useQueryParams} from "common/hooks";
import {PreloaderContainer, SkeletonLoader, EmptyListMessage, Preloader} from "common/components";
import {getAmountOfDays, getUrlParams} from "common/utils";
import {selectHotelData} from "app/selectors";
import {HotelDataItem} from "../favorites";
import Box from "@mui/material/Box";
import s from "../Main.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

export const Hotels = () => {
    const amountOfDays = useAppSelector(selectHotelData).amountOfDays
    const dispatch = useAppDispatch()
    const [searchParams, setParams] = useQueryParams()
    const params = getUrlParams(searchParams)
    const {data, isLoading, isError} = useFetchHotelsQuery(params)
    const location = searchParams.get("location")
    const checkIn = searchParams.get("checkIn") || ""
    const checkOut = searchParams.get("checkOut") || ""
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
        const amountOfDays = getAmountOfDays(new Date(checkIn), new Date(checkOut))
        dispatch(setData({amountOfDays}))
    }, [checkIn, checkOut])

    useEffect(() => {
        if (ref.current) ref && ref.current.scrollIntoView()
    }, [location])

    return (
        <InfiniteScroll
            height={"60vh"}
            dataLength={mappedHotels && mappedHotels.length || 5}
            next={loadMoreHandler}
            hasMore={true}
            loader={!isError && <Preloader pure/>}
            className={s.scrollContainer}
        >
            <Box ref={ref} sx={{alignSelf: "start"}} className={s.hotelsContainer}>
                <PreloaderContainer condition={isLoading} loader={<SkeletonLoader/>}>
                    {data && data.length > 0 ?
                        mappedHotels
                        : <EmptyListMessage message="no results"/>}
                </PreloaderContainer>
            </Box>
        </InfiniteScroll>
    );
};

