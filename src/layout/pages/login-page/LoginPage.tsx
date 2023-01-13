import React from 'react';
import {Box, Typography} from "@mui/material";
import {boxStyle} from "common/styles";
import bgImage from "assets/images/bg-img.png"
import {LoginForm} from "./form/LoginForm";
import commonS from "common/styles/CommonStyles.module.scss"
import { useAppSelector } from 'common/hooks/redux-hooks';
import {useRedirectTo} from "common/hooks/useRedirectTo";
import {PATH} from "layout/routes/routes";
import {selectIsAuth} from "app/selectors";

export const LoginPage = () => {

    const isAuth = useAppSelector(selectIsAuth);
    useRedirectTo(PATH.MAIN_PAGE, isAuth, [isAuth]);

    return (
        <Box sx={loginPageStyle}>
            <Box sx={bgStyle}></Box>
            <Box sx={boxStyle}>
                <Typography component={"h2"}
                            className={commonS.logo}>
                    Simple Hotel Check
                </Typography>
                <LoginForm/>
            </Box>
        </Box>
    );
};

const loginPageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
}

const bgStyle = {
    position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    opacity: "0.3",
    filter: "blur(5px)"
}