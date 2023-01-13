import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {Hotels} from "../favorites/fav-hotels/Hotels";
import {Slider} from "../slider/Slider";

export const HotelsContent = () => {
    return (
        // todo: fix inline styles
        <Box sx={boxStyle} style={{width: "100%"}}>
            <Breadcrumbs
                separator={<ArrowForward fontSize="small"/>}
                aria-label="breadcrumb"
            >
                <Link>Hotels</Link>
                <Link>Moscow</Link>
            </Breadcrumbs>

            <Typography component={"p"}>
                07 Jule 2020
            </Typography>

            {/*<Slider/>*/}

            <Hotels/>

        </Box>
    )
}
