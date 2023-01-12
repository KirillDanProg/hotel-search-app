import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import {PATH} from "./routes/routes";

export const ProtectedComponents = () => {
    // const isAuth = useAppSelector(selectCurrentUser);
    // const isAuth = useAppSelector(selectCurrentUser);
    const isAuth = false

    return (
        <Box component={"main"} sx={AppContainerStyle} >
            {
                isAuth
                    ? <Outlet />
                    : <Navigate to={PATH.LOGIN} />
            }
        </Box>
    );
};

const AppContainerStyle = {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "red",
}