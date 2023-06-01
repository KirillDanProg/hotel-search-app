import {useFormik} from "formik";
import {boxStyle, buttonStyle} from "common/styles";
import {InputLabelForm} from "layout/pages/login-page/form";
import {useEffect, useRef} from "react";
import {getUrlParams, getFormattedDate} from "common/utils";
import {useAppDispatch, useQueryParams} from "common/hooks";
import {useLazyFetchHotelsQuery} from "features/hotels/hotelsAPI";
import {setData} from "features/hotels/hotelsSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close'
import * as yup from "yup";
import commonS from "common/styles/CommonStyles.module.scss";


const validationSchema = yup.object().shape({
    location: yup.string().required('Required'),
    checkOut: yup.date()
        .when("checkIn", (checkIn, schema) => checkIn && schema.min(checkIn))
});

export const HotelSearch = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setParams] = useQueryParams()
    const location = searchParams.get("location") || "Moscow"
    const [searchHotels] = useLazyFetchHotelsQuery()
    const date = new Date()
    //дата заезда из query parameter URL или установить текущую дату
    const defaultCheckIn = searchParams.get("checkIn") || getFormattedDate(date, "toISOString")
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const defaultCheckOut = searchParams.get("checkOut") || getFormattedDate(new Date(tomorrow), "toISOString")
    const ref = useRef<HTMLInputElement>(null)
    const {touched, errors, handleChange, handleSubmit, values, setFieldValue} = useFormik({
        initialValues: {
            location,
            checkIn: defaultCheckIn,
            checkOut: defaultCheckOut
        },
        validationSchema,
        onSubmit: ({checkIn, checkOut, location}) => {
            setParams("location", location)
            setParams("checkIn", checkIn)
            setParams("checkOut", checkOut)
            const params = getUrlParams(searchParams)
            searchHotels(params)
            dispatch(setData({checkIn, checkOut}))
        },
    });

    const cleanField = () => {
        setFieldValue("location", "")
        ref.current && ref.current.focus()
    }

    useEffect(() => {
        setParams("location", values.location)
        setParams("checkIn", defaultCheckIn)
        setParams("checkOut", defaultCheckOut)
        setParams("limit", "6")
        const params = getUrlParams(searchParams)
        searchHotels(params)
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
                                min={defaultCheckIn}
                />
                <InputLabelForm id={"checkOut"}
                                type={"date"}
                                value={values.checkOut}
                                htmlFor={"Check-out"}
                                error={errors.checkOut}
                                touched={touched.checkOut}
                                onChange={handleChange}
                                min={defaultCheckOut}
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
