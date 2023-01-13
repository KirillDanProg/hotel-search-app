import React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {buttonStyle} from "common/styles";
import {useFormik} from "formik";
import {InputLabelForm} from "./InputLabelForm";
import * as yup from "yup";
import commonS from "common/styles/CommonStyles.module.scss";
import {useAppDispatch} from "../../../../common/hooks/redux-hooks";
import {login} from "../../../../features/login/loginSlice";


const initialValues = {
    login: '',
    password: '',
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()

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
            dispatch(login(values.login))
        },
    });

    return (
        <Box component={"form"}
             onSubmit={handleSubmit}
             className={commonS.formContainer}
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

