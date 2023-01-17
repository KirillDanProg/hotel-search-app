import {boxStyle} from "common/styles";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import {Hotels} from "./Hotels";
import {useQueryParams} from "common/hooks";
import {getFormattedDate} from "common/utils";
import {Carousel} from "../slider/Slider";
import s from "../Main.module.scss"
import Box from "@mui/material/Box";
import ArrowForward from "@mui/icons-material/ArrowForward";

export const HotelsContent = () => {
    const [searchParams] = useQueryParams()
    const checkInDate = searchParams.get("checkIn") || ""
    const city = searchParams.get("location") || "Moscow"

    return (
        // todo: fix inline styles
        <Box sx={boxStyle} style={{width: "100%"}}>
            <Breadcrumbs
                separator={<ArrowForward fontSize="small"/>}
                aria-label="breadcrumb"
            >
                <Link>Hotels</Link>
                <Link>{city}</Link>
            </Breadcrumbs>

            <Typography className={s.dateOfCheckIn} component={"p"}>
                {getFormattedDate(checkInDate, "toUTCString")}
            </Typography>

            <Carousel/>

            <Hotels/>
        </Box>
    )
}
