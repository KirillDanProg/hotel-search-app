import React from 'react';
import Box from "@mui/material/Box";
import commonS from "common/styles/CommonStyles.module.scss"
import s from "./Header.module.scss"
import LogoutIcon from '@mui/icons-material/Logout'
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../common/hooks/redux-hooks";
import {logout} from "../../features/login/loginSlice";

export const Header = () => {
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Box className={s.header}>
            <Logo/>
            <Button className={s.logoutButton} onClick={logoutHandler}>
                logout
                <LogoutIcon/>
            </Button>
        </Box>
    );
};

export const Logo = () => {
    return (
        <Box className={commonS.logo}>
            simple hotel check
        </Box>
    )
}
