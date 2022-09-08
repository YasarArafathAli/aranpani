import { Radio } from 'antd';
import { ErrorMessage, Field } from 'formik';
import React, { FC } from 'react';
import { OptionModel } from '../../../models/meta.model';
interface RadioComponentProps {
    options: OptionModel[]
    name: string
}
const RadioComponent: FC<RadioComponentProps> = (props) => {

    const {
        options,
        name,
    } = props

    return <div>
        <label htmlFor="genderId">Gender</label>
        <Field name={name}>
            {({ form, meta, field }: any) => {
                return <>
                    <Radio.Group
                        {...field}
                        {...meta}
                        className='ml-5'
                        name='genderId'
                        options={options as any[]}
                        onChange={(e) => {
                            form.setFieldValue(name, e.target.value)
                        }}
                    ></Radio.Group>
                    <ErrorMessage name={name}></ErrorMessage>
                </>
            }}
        </Field>

    </div>;
};

export default RadioComponent;
