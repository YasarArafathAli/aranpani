import React, { FC, useEffect, useState } from 'react'
import "./contactDetails.scss"
import { Form, Formik } from "formik";
import CustomInput from "../../../shared/components/CustomInput";
import { Button, Modal } from "antd";
import { contactDetailsValidation } from "./contactDetailsValidation";
import { ContactDetailsModel } from "../../../models/contactDetails.model";
import ContactDetailService from "../../../services/ContactDetailService/contactDetail.service";
import PhoneNumberInput from '../../../shared/components/PhoneNumberInput';
import { parsePhoneNumber } from 'react-phone-number-input';

interface ContactDetailsProps {
    showModal: boolean;
    setShowModal: Function; 
}

const ContactDetails: FC<ContactDetailsProps> = ({ showModal, setShowModal }) => {

    const { fetchContactDetails, contactDetails, buttonLoading, updateContactDetails } = ContactDetailService();

    useEffect(() => {
        showModal && fetchContactDetails().then();
    }, [showModal])

    useEffect(() => {
        contactDetails && setInitialValues({
            ...contactDetails,
            otpMobileNumber: contactDetails.id ? (contactDetails.otpMobileNumberIsdCode || '') + contactDetails.otpMobileNumber : undefined,
            mobileNumber: contactDetails.id ? (contactDetails.mobileNumberIsdCode || '') + contactDetails.mobileNumber : undefined,
        })
    }, [contactDetails])

    const [initialValues, setInitialValues] = useState<ContactDetailsModel>({
        mobileNumber: "",
        mobileNumberIsdCode: "+91",
        otpMobileNumber: "",
        otpMobileNumberIsdCode: "+91",
        emailId: ""
    })

    const handleSubmit = (values: ContactDetailsModel) => {
        const mobile = parsePhoneNumber(values.mobileNumber || '')
        const otpMobile = parsePhoneNumber(values.otpMobileNumber || '')
        values.mobileNumber = mobile?.nationalNumber as string
        values.mobileNumberIsdCode = '+' + mobile?.countryCallingCode as string
        values.otpMobileNumber = otpMobile?.nationalNumber as string
        values.otpMobileNumberIsdCode = "+" + otpMobile?.countryCallingCode as string
        updateContactDetails(values).then(() => {
            setShowModal(false);
        })
    }

    return (
        <div className="contact-details">
            <Modal title={
                <div className="modal-title">
                    <h2>Contact Details</h2>
                    <i className="icon-close" onClick={() => setShowModal(false)} />
                </div>
            }
                visible={showModal}
                onCancel={() => setShowModal(false)}
                className="create-project-modal create-payment-modal"
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={contactDetailsValidation}
                    enableReinitialize
                >
                    {({ isValid, setFieldValue, values }) => {
                        return (
                            <Form className="create-project-form create-internal-user">
                                <div className="form-field">
                                    <PhoneNumberInput
                                        title='Contact Phone Number'
                                        name={'mobileNumber'}
                                        value={values.mobileNumber}
                                        onChange={(value) => {
                                            setFieldValue("mobileNumber", value)
                                        }}
                                    />
                                </div>
                                <div className="form-field">
                                    <CustomInput type="email"
                                        name="emailId"
                                        placeholder="Type email"
                                        title="Contact Email Address"
                                    />
                                </div>
                                <div className="form-field">
                                    <PhoneNumberInput
                                        title='Phone Number for One Time Payment OTP'
                                        name={'otpMobileNumber'}
                                        value={values.otpMobileNumber}
                                        onChange={(value) => {
                                            setFieldValue("otpMobileNumber", value)
                                        }}
                                    />
                                </div>
                                <div className="form-field">
                                    <Button type="primary"
                                        htmlType="submit"
                                        loading={buttonLoading}
                                        disabled={!isValid}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal>
        </div>
    )
}

export default ContactDetails;