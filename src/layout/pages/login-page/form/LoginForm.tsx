import React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {boxStyle, buttonStyle} from "common/styles";
import {useFormik} from "formik";
import {InputLabelForm} from "./InputLabelForm";
import * as yup from "yup";
import s from "../Login.module.scss"

export type InitialValuesType = typeof initialValues
const initialValues = {
    login: '',
    password: '',
}

export const LoginForm = () => {
    const validationSchema = yup.object().shape({
        login: yup.string()
            .email('Invalid email').required('Required'),
        password: yup.string()
            .min(2, 'The password is too Short!')
            .max(50, 'The password is too Long!')
            .required('Required'),
    });

    const {touched, errors, handleChange, handleSubmit, values} = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            debugger
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box component={"form"}
             onSubmit={handleSubmit}
             className={s.formContainer}
        >
            <InputLabelForm id="login"
                            type="text"
                            onChange={handleChange}
                            value={values.login}
                            htmlFor="Login"
                            error={errors.login}
                            touched={touched.login}
            />
            <InputLabelForm id="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            htmlFor="Password"
                            error={errors.password}
                            touched={touched.password}
            />
            <Button type="submit" sx={buttonStyle}>
                sign in
            </Button>
        </Box>
    );
};

