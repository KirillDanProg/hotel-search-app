import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import {PATH} from "./routes/routes";
import {selectIsAuth} from "../app/selectors";
import {useAppSelector} from "../common/hooks/redux-hooks";

export const ProtectedComponents = () => {
    const isAuth = useAppSelector(selectIsAuth);

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
    maxHeight: "100vh",
}