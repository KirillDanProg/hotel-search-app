import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {PATH} from "../../../incubator/friday-project/cards-friday-pr/src/layout/AppRoutes/routes";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    // const returnBtn = useRedirectTo
    const navigate = useNavigate()
    const returnHomeHandler = () => {
        navigate(PATH.PACK_LISTS)
        // returnBtn(PATH.PACK_LISTS, true, [true])
    }

    return (
        <Container
            maxWidth="sm"
            sx={container}
        >
            <Box sx={{display: 'flex', gap: '62px', marginRight: 'auto'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                    <img style={imageOops} src={"oops"}/>
                    <Button variant={'contained'} onClick={returnHomeHandler}> Back to home page </Button>
                </Box>
                <img style={image404} src={""}/>
            </Box>
        </Container>
    )
}

const container ={
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    marginTop: '100px'
}

const imageOops = {
    height: '300px',
    width: '300px',
}

const image404 = {
    height: '500px',
    width: '500px',
}