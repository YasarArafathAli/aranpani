import React, { FC } from 'react'
import "./otpField.scss"
import {ErrorMessage, Field} from "formik";
import Error from "../Error";
 // @ts-ignore: Unreachable code error
import OtpInput from 'react-otp-input';


interface OtpFieldProps {
    name: string;
    title: string;
    onChange: Function;
    value?:string|number;
    numInputs:number;
}

const OtpField: FC<OtpFieldProps> = (props) => {
    const { name, title } = props;

    return (
        <div className="otp-field">
            <div className="mb-1">
                <label htmlFor={name}>{title}</label>
                <Field className="otp-input" as={OtpInput} {...props} />
                <ErrorMessage name={name}>
                    {(message: string) => <Error message={message} />}
                </ErrorMessage>
            </div>
        </div>
    )
}

export default OtpField;