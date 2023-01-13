import {useFormik} from "formik";
import Box from "@mui/material/Box";
import {boxStyle, buttonStyle} from "common/styles";
import {InputLabelForm} from "../../login-page/form/InputLabelForm";
import commonS from "common/styles/CommonStyles.module.scss";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import {useQueryParams} from "../../../../common/hooks/useQueryParams";

export const HotelSearch = () => {
    const [searchParams, setParams] = useQueryParams()
    //дата заезда из query parameter URL или установить текущую дату
    const dateToday = searchParams.get("checkIn") || new Date().toISOString().slice(0, 10)
    const dateTomorrow = dateToday.slice(0, 8) + Number(new Date().getDate() + 1)

    const {touched, errors, handleChange, handleSubmit, values} = useFormik({
        initialValues: {
            location: "Moscow",
            checkIn: dateToday,
            amountOfDays: 1
        },
        // validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        setParams("location", values.location)
        setParams("checkIn", dateToday)
        setParams("checkOut", String(dateTomorrow))
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
                />
                <InputLabelForm id={"checkIn"}
                                type={"date"}
                                value={values.checkIn}
                                htmlFor={"Check-in"}
                                error={errors.checkIn}
                                touched={touched.checkIn}
                                onChange={handleChange}
                />
                <InputLabelForm id={"amountOfDays"}
                                type={"number"}
                                value={values.amountOfDays}
                                htmlFor={"Amount of days"}
                                error={errors.amountOfDays}
                                touched={touched.amountOfDays}
                                onChange={handleChange}
                />
                <Button type="submit" sx={buttonStyle}>search</Button>
            </Box>

        </Box>
    )
}