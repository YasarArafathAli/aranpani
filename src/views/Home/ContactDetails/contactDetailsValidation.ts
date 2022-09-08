import * as Yup from "yup";

export const contactDetailsValidation = Yup.object().shape({
    mobileNumber: Yup.string().required("Mobile number is required")
        .min(8, "Mobile number should be valid")
        .max(15, "Mobile number should be valid"),
    otpMobileNumber: Yup.string().required("Mobile number for OTP verification is required")
        .min(8, "Mobile number should be valid")
        .max(15, "Mobile number should be valid"),
    emailId: Yup.string().required("Email ID is required").email("Invalid Email")
})