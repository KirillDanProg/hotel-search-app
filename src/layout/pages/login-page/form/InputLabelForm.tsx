import React, {ChangeEvent, FC} from 'react';
import commonS from "common/styles/CommonStyles.module.scss";

export const InputLabelForm: FC<PropsType> = ({error, touched, htmlFor, ...restProps}) => {
    return (
        <div className={commonS.formItemContainer}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            <input
                {...restProps}
                className={commonS.input}
                autoComplete={"off"}
            />
            {error && touched && error}
        </div>
    );
};

type PropsType = {
    id: string
    type: string
    onChange: (e: string | ChangeEvent<any>) => void
    value: string | number
    htmlFor: string
    error: string | undefined
    touched: boolean | undefined
}
