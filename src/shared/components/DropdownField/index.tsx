import React from "react";
import { Select } from "antd";
import "./dropdownField.scss";
import { Field, ErrorMessage } from "formik";
import Error from "../Error";


interface DropdownFieldProps {
    name: string;
    options?: any[];
    title?: string;
    setFieldValue?: Function;
    setFieldTouched?: Function;
    onChange?: (value: any, option: any) => void;
    onSearch?: (value: any) => void;
    onSelect?: (value: any) => void;
    onBlur?: (value: any) => void;
    onKeyDown?: (value: any) => void;
    onClick?: (e: any) => void
    placeHolder?: string;
    value?: any;
    showSearch?: boolean;
    showArrow?: boolean;
    disabled?: boolean;
    dropdownMatchSelectWidth?: boolean;
    optionLabelProp?: string;
    loading?: boolean;
    defaultValue?: string | number;
    darkmode?: boolean;
    className?: string;
    onOptionsScroll?: (event: any) => void;
}

function DropdownField(props: DropdownFieldProps) {
    const {
        name,
        title,
        setFieldValue,
        optionLabelProp,
        options,
        placeHolder,
        onChange,
        value,
        showSearch,
        onSearch,
        onSelect,
        onBlur,
        onClick,
        disabled,
        showArrow,
        loading = false,
        defaultValue,
        onKeyDown,
        darkmode,
        className,
        onOptionsScroll
    } = props;

    const handleChange = (value: any) => {
        if (setFieldValue) setFieldValue(name, value);
    };

    const handleFilter = (input: string, option: any) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return (
        <Field name={name}>
            {({
                field,
                form: { touched, errors, setFieldTouched },
                meta,
            }: any) => {
                return (
                    <div className={`dropdown-field ${darkmode && "dropdown-field-dark"}`}>
                        {title && (
                            <label>{title}</label>
                        )}
                        <Select
                            options={options}
                            placeholder={placeHolder}
                            onBlur={() => setFieldTouched(name)}
                            onChange={onChange ? onChange : handleChange}
                            onSearch={onSearch ? onSearch : undefined}
                            onSelect={onSelect ? onSelect : undefined}
                            showSearch={showSearch}
                            optionLabelProp={optionLabelProp}
                            filterOption={showSearch ? handleFilter : undefined}
                            disabled={disabled}
                            showArrow={showArrow}
                            onClick={onClick}
                            dropdownMatchSelectWidth={false}
                            value={value}
                            loading={loading}
                            defaultValue={defaultValue}
                            onKeyDown={onKeyDown}
                            className={className}
                            data-testid={name}
                            onPopupScroll={(event) => onOptionsScroll ? onOptionsScroll(event) : ''}
                        />
                        <ErrorMessage name={name}>
                            {(message: string) => (
                                // @ts-ignore
                                <Error className={`${name}__error`}
                                    message={message}
                                />
                            )}
                        </ErrorMessage>
                    </div>
                );
            }}
        </Field>
    );
}

export default DropdownField;
