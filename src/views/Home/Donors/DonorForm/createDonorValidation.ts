import * as Yup from "yup";

export const createDonorValidation = Yup.object().shape({
    username: Yup.string().required("Donor name is required"),
    mobileNumber: Yup.string().required("Mobile number is required")
        .min(8, "Mobile number should be valid")
        .max(15, "Mobile number should be valid"),
    emailId: Yup.string()
        .email("Invalid email"),
    guardianName: Yup.string().required("Father/Husband is required"),
    countryId: Yup.string().required("Country is required"),
    pinCode: Yup.string().required("Pincode is required"),
    repId: Yup.string().required("Area representative is required").nullable(),
    status: Yup.boolean().required("status is required"),
    pan: Yup.string()
        .required("PAN Number is requried")
        .min(10, "PAN Number should have 10 digits")
        .max(10, "PAN Number should have 10 digits"),
    age: Yup.string()
        .required("Age is required"),
    cityId: Yup.string().when(['countryName'], (countryName: string, schema: any) => {
        if (countryName && countryName?.toLowerCase()?.includes('india'))
            return schema.required("City is required!")
        return schema;
    }),
    stateId: Yup.string().when(['countryName'], (countryName: string, schema: any) => {
        if (countryName && countryName?.toLowerCase()?.includes('india'))
            return schema.required("State is required!")
        return schema;
    }),
    genderId: Yup.number()
        .required("Gender is required"),
    identificationCardValue: Yup.string()
        .min(4, "ID Card Number should have atleast 4 digits")
        .max(20, "ID Card Number should have atmost 20 digits")
        .required("ID Card Number is required"),
    identificationCardId: Yup.string()
        .required("ID Card is required"),
})