import Box from "@mui/material/Box";
import {boxStyle} from "../../../../common/styles";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {Hotels} from "../favorites/fav-hotels/Hotels";
import {Slider} from "../slider/Slider";
import {useQueryParams} from "../../../../common/hooks/useQueryParams";
import {getFormattedDate} from "../../../../common/utils/getFormattedDate";
import s from "../Main.module.scss"

export const HotelsContent = () => {
    const [searchParams] = useQueryParams()
    const date = searchParams.get("checkIn") || getFormattedDate(new Date, "toISOString")
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
                {getFormattedDate(date, "toUTCString")}
            </Typography>

            {/*<Slider/>*/}

            <Hotels/>

        </Box>
    )
}
