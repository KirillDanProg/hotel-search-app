import React, {ChangeEvent, forwardRef, MutableRefObject, ReactElement} from 'react';
import commonS from "common/styles/CommonStyles.module.scss";

export const InputLabelForm = forwardRef<null, PropsType>(({error, touched, htmlFor, ...restProps}, ref) => {
    return (
        <div className={commonS.formItemContainer}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            <input
                ref={ref}
                {...restProps}
                className={commonS.input}
                autoComplete={"off"}
            />
            {error && touched && error}
            {restProps.icon}
        </div>
    );
});

type PropsType = {
    id: string
    type: string
    value: string | number
    htmlFor: string
    error: string | undefined
    touched: boolean | undefined
    onChange: (e: any | ChangeEvent<any>) => void
    icon?: ReactElement<any, any>
    ref?: MutableRefObject<null>
    min?: string
}
