import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {FC} from "react";

type PropsType = {
    pure?: boolean
}
export const Preloader: FC<PropsType> = ({pure}) => {
    return <>
        {
            pure
                ? <CircularProgress  sx={{position: "relative", left: "50%"}}/>
                : <Box sx={styles}>
                    <CircularProgress/>
                </Box>
        }
    </>
}

const styles = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
}