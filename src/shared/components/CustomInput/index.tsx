import React from 'react'
import {Field , ErrorMessage} from 'formik';
import {Input} from 'antd';
function CustomInput(props:any) {
   const {name, title} = props
  return (
    <div>
        <label htmlFor={name} >{title}</label>
        <Field as={Input} {...props} />
        <ErrorMessage name={name}>
            {(message) => <div className='error_message'>{message}</div>}
        </ErrorMessage>
    </div>
  )
}

export default CustomInput