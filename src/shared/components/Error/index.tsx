import React, { FC } from "react";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
    const { message } = props
    return (
        <div style={{color:'#E55252'}}>
            { message }
        </div>
    )
}

export default ErrorMessage;