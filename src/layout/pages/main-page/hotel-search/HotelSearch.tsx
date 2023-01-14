import {useFormik} from "formik";
import Box from "@mui/material/Box";
import {boxStyle, buttonStyle} from "common/styles";
import {InputLabelForm} from "../../login-page/form/InputLabelForm";
import commonS from "common/styles/CommonStyles.module.scss";
import Button from "@mui/material/Button";
import {useEffect, useRef} from "react";
import {useQueryParams} from "common/hooks/useQueryParams";
import CloseIcon from '@mui/icons-material/Close'
import {getUrlParams} from "common/utils/getUrlParams copy";
import {useLazyFetchHotelsQuery} from "features/hotels/hotelsAPI";

export const HotelSearch = () => {
    const [searchParams, setParams] = useQueryParams()
    const location = searchParams.get("location") || "Moscow"
    const [searchHotels, {isLoading}] = useLazyFetchHotelsQuery()
    //дата заезда из query parameter URL или установить текущую дату
    const today = searchParams.get("checkIn") || new Date().toISOString().slice(0, 10)
    const tomorrow = searchParams.get("checkOut") || today.slice(0, 8) + Number(new Date().getDate() + 1)

    //todo fix ref type
    const ref = useRef<any>(null)

    const {touched, errors, handleChange, handleSubmit, values, setFieldValue} = useFormik({
        initialValues: {
            location,
            checkIn: today,
            checkOut: tomorrow
        },
        // validationSchema,
        onSubmit: (values) => {
            setParams("location", values.location)
            setParams("checkIn", values.checkIn)
            setParams("checkOut", values.checkOut)
            const params = getUrlParams(searchParams)
            searchHotels(params)
        },
    });

    const cleanField = () => {
        setFieldValue("location", "")
        ref.current.focus()
    }

    useEffect(() => {
        setParams("location", values.location)
        setParams("checkIn", today)
        setParams("checkOut", String(tomorrow))
    }, [])

    return (
        <Box sx={boxStyle}>
            <Box component={"form"} onSubmit={handleSubmit} className={commonS.formContainer}>
                <InputLabelForm id={"location"}
                                type={"text"}
                                value={values.location}
                                htmlFor={"Location"}
                                error={errors.location}
                                touched={touched.location}
                                onChange={handleChange}
                                icon={<CloseIcon onClick={cleanField} sx={iconStyle}/>}
                                ref={ref}
                />
                <InputLabelForm id={"checkIn"}
                                type={"date"}
                                value={values.checkIn}
                                htmlFor={"Check-in"}
                                error={errors.checkIn}
                                touched={touched.checkIn}
                                onChange={handleChange}
                                min={today}
                />
                <InputLabelForm id={"checkOut"}
                                type={"date"}
                                value={values.checkOut}
                                htmlFor={"Check-out"}
                                error={errors.checkOut}
                                touched={touched.checkOut}
                                onChange={handleChange}
                                min={tomorrow}
                />
                <Button type="submit" sx={buttonStyle}>search</Button>
            </Box>

        </Box>
    )
}


const iconStyle = {
    position: "absolute",
    top: "37px",
    right: "5px",
    opacity: "0.5",
    fontSize: "20px",
    cursor: "pointer"
}