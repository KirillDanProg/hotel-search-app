import {useFormik} from "formik";
import Box from "@mui/material/Box";
import {boxStyle, buttonStyle} from "../../../../common/styles";
import {InputLabelForm} from "../../login-page/form/InputLabelForm";
import commonS from "../../../../common/styles/CommonStyles.module.scss";
import Button from "@mui/material/Button";

export const HotelSearch = () => {

    const initialValues = {
        //todo: fix => use params
        location: "Moscow",
        checkIn: '',
        amountOfDays: 1
    }

    const {touched, errors, handleChange, handleSubmit, values} = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                <InputLabelForm id={"date"}
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
                <Button sx={buttonStyle}>search</Button>
            </Box>

        </Box>
    )
}