import { ErrorMessage, Field } from 'formik'
import React, { FC } from 'react'
import PhoneInput from 'react-phone-number-input'
import "./phoneNumberInput.scss"
import 'react-phone-number-input/style.css'

interface PhoneNumberInputProps {
    name: string
    title?: string
    disabled?: boolean
    value: string | number | undefined
    onChange: (mobile: string) => void
    prefix?: JSX.Element | string
}

const PhoneNumberInput: FC<PhoneNumberInputProps> = (props) => {

    const {
        name,
        value,
        title,
        disabled,
        onChange,
        prefix,
    } = props
    return (
        <div className={`phone-number-input ${disabled && 'disabled-field'}`}>
            {title && <label htmlFor={name}>{title}</label>}
            <Field name={name}>
                {({ field, meta, form }: any) => <>
                    <div className="phone-number-input-field">
                        {prefix}
                        <PhoneInput
                            className='ant-input'
                            placeholder="Enter"
                            {...field}
                            {...meta}
                            disabled={disabled}
                            countrySelectProps={{ unicodeFlags: true }}
                            countryCallingCodeEditable={false}
                            international
                            aria-placeholder='Enter mobile number'
                            focusInputOnCountrySelection
                            defaultCountry="IN"
                            value={value as any}
                            onChange={onChange} />
                    </div>
                    <span className='input__error'>
                        <ErrorMessage className='input__error' name={name}></ErrorMessage>
                    </span>
                </>}
            </Field>
        </div>
    )
}

export default PhoneNumberInput
