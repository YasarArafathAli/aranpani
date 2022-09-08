import React, { FC } from 'react'
import "./textareaField.scss"
import {Button, Modal, Input} from "antd";
import {ErrorMessage, Field} from "formik";
import Error from "../Error";

const {TextArea} = Input;

interface TextareaFieldProps {
    title:string;
    rows: number;
    name: string;
    placeholder: string;
}

const TextareaField: FC<TextareaFieldProps> = (props) => {

    const { title,name } = props;

    return (
        <div className="textarea-field">
            <div className="mb-1">
                <label htmlFor={name}>{title}</label>
                <Field className="text-area-field" as={TextArea} {...props} />
                <ErrorMessage name={name}>
                    {(message: string) => <Error message={message} />}
                </ErrorMessage>
            </div>
        </div>
    )
}

export default TextareaField;