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
import {getFormattedDate} from "common/utils/getFormattedDate";
import {setData} from "features/hotels/hotelsSlice";
import {useAppDispatch} from "common/hooks/redux-hooks";
import * as yup from "yup";

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
    //дата заезда из query parameter URL или установить текущую дату
    const today = searchParams.get("checkIn") || getFormattedDate(new Date, "toISOString")
    const tomorrow = searchParams.get("checkOut") || today.slice(0, 8) + Number(new Date().getDate() + 1)
    const ref = useRef<HTMLInputElement>(null)

    const {touched, errors, handleChange, handleSubmit, values, setFieldValue} = useFormik({
        initialValues: {
            location,
            checkIn: today,
            checkOut: tomorrow
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
        setParams("checkIn", today)
        setParams("checkOut", String(tomorrow))
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