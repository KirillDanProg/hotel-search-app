import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import {PATH} from "./routes/routes";
import {selectUserLogin} from "../app/selectors";
import {useAppSelector} from "../common/hooks/redux-hooks";

export const ProtectedComponents = () => {
    const isAuth = useAppSelector(selectUserLogin);

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
}