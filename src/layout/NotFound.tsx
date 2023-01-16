import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import {PATH} from "./routes/routes";
import img from "assets/images/not-found/notfound-img.jpg"

export const NotFound = () => {
    const navigate = useNavigate()
    const returnHomeHandler = () => {
        navigate(PATH.MAIN_PAGE)
    }

    return (
        <Container
            maxWidth="sm"
            sx={container}
        >
            <Box sx={{display: 'flex', gap: '62px', marginRight: 'auto'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                    <img alt={"page not found"} style={imageOops} src={img}/>
                    <Button variant={'contained'} onClick={returnHomeHandler}> Back to home page </Button>
                </Box>
            </Box>
        </Container>
    )
}

const container = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    marginTop: '100px'
}

const imageOops = {
    width: "100%"
}
