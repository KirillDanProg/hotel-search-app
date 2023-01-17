import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonItem = () => {
    return (
        <Box sx={boxStyle}>
            <Skeleton width="50%" height={40} sx={{}}/>
            <Skeleton width="120px" height={22} style={{marginBottom: "0"}}/>
            <Skeleton width="130px" height={40} style={{marginBottom: "0"}}/>
            <Skeleton sx={favIcon}/>
            <Skeleton sx={priceSkeleton}/>
        </Box>
    )
}
export const SkeletonLoader = (props: { n?: number }) => {
    return (
        <>
           <SkeletonItem/>
           <SkeletonItem/>
           <SkeletonItem/>
        </>
    );

};

const favIcon = {
    position: "absolute",
    top: "0",
    right: "0",
    width: "30px",
    height: "50px",
    padding: "0"
};
const priceSkeleton = {
    position: "absolute",
    bottom: "22px",
    right: "0",
    width: "100px",
    height: "30px",
}
const boxStyle = {
    position: "relative",
    height: '140px'
}