import React, { FC, useEffect, useState } from 'react'
import "./donorBasicInfo.scss"
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, Col, Progress, Row } from "antd";
import CustomInput from "../../../../../shared/components/CustomInput";
import CustomCard from "../../../../../shared/components/CustomCard";
import DropdownField from "../../../../../shared/components/DropdownField";
import { DonorModel } from '../../../../../models/donors.model';
import { GenderModel, OptionModel } from '../../../../../models/meta.model';
import { ApiRoutes } from '../../../../../routes/routeConstants/apiRoutes';
import MetaService from '../../../../../services/MetaService/meta.service';
import PhoneNumberInput from '../../../../../shared/components/PhoneNumberInput';
import { parsePhoneNumber } from 'react-phone-number-input';

interface DonorBasicInfoProps {
    donor?: DonorModel;
    refreshDonor: Function;
    updateHandler: (donor: DonorModel, cb: () => void) => void
}

const DonorBasicInfo: FC<DonorBasicInfoProps> = (props) => {
    const { donor, refreshDonor, updateHandler } = props;

    const {
        fetchMeta,
    } = MetaService()

    const [editable, setEditable] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<DonorModel>(donor || {});

    const [cities, setCities] = useState<OptionModel[]>([])

    const [states, setStates] = useState<OptionModel[]>([])

    const [countries, setCountries] = useState<OptionModel[]>([])

    const [genders, setGenders] = useState<OptionModel[]>([])

    const [ids, setIds] = useState<OptionModel[]>([])

    useEffect(() => {
        fetchMeta(ApiRoutes.GENDERS, setGenders, "genders", {}, GenderModel)
        fetchMeta(ApiRoutes.IDENTIFICATION_CARDS, setIds, "identification_cards")
        fetchMeta(ApiRoutes.META_COUNTRIES, setCountries, "countries")
        if (initialValues.countryId || initialValues.country?.id)
            fetchMeta(ApiRoutes.META_STATES, setStates, "states", { country_id: initialValues.countryId || initialValues.country?.id })
        if (initialValues.stateId || initialValues.state?.id)
            fetchMeta(ApiRoutes.META_CITIES, setCities, "cities", { state_id: initialValues.stateId || initialValues.state?.id })
    }, [])

    useEffect(() => {
        donor && setInitialValues(donor)
    }, [donor])

    const handleCancel = (setFieldValue: Function) => {
        setEditable(!editable)
    }

    const submitHandler = (values: DonorModel, helpers: FormikHelpers<DonorModel>) => {
        updateHandler(values, () => {
            helpers.resetForm()
            setEditable(false)
        })
    }
    return (
        <div className="donor-basic-info project-basic-info">
            <CustomCard>
                <div className="details">
                    <div className="details-form">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={submitHandler}
                            enableReinitialize
                        >
                            {({ values, setFieldValue, resetForm }) =>
                                <Form>
                                    <div className="title">
                                        <h3 className="mr-5 mb-0">Profile Details</h3>
                                        {editable ?
                                            <div className="edit-controls">
                                                <Button htmlType="submit">
                                                    <i className="icon-done" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleCancel(setFieldValue)
                                                        resetForm()
                                                    }}>
                                                    <i className="icon-close" />
                                                </Button>
                                            </div>
                                            :
                                            <span>
                                                <i className="icon-edit"
                                                    onClick={() => setEditable(!editable)}
                                                />
                                            </span>
                                        }
                                    </div>
                                    <Row className="labels">
                                        <Col span={7}>
                                            Registration Number
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <i className="icon-phone" style={{ color: "grey" }} /> Phone Number
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field"}
                                                placeholder=""
                                                name="regNumber"
                                                type="text"
                                                disabled={true}
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <PhoneNumberInput
                                                name={'mobileNumber'}
                                                disabled={true}
                                                value={((values.isdCode || '') + values.mobileNumber)}
                                                onChange={(value) => setFieldValue("mobileNumber", value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="labels">
                                        <Col span={8}>
                                            Country
                                        </Col>
                                        <Col span={8}>
                                            State
                                        </Col>
                                        <Col span={8}>
                                            District
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <DropdownField name="countryId"
                                                options={countries}
                                                showArrow={editable}
                                                value={values?.countryId || values.country?.id}
                                                className={"input-field " + (editable ? "editable" : null)}
                                                onChange={(value) => {
                                                    setFieldValue("countryId", value)
                                                    fetchMeta(ApiRoutes.META_STATES, setStates, "states", { country_id: value })
                                                }}
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <DropdownField name="stateId"
                                                options={states}
                                                showArrow={editable}
                                                disabled={editable && !values.countryId && !values.country?.id}
                                                value={values?.stateId || values.state?.id}
                                                className={"input-field " + (editable ? "editable" : null)}
                                                onChange={(value) => {
                                                    setFieldValue("stateId", value)
                                                    fetchMeta(ApiRoutes.META_CITIES, setCities, "cities", { state_id: value })
                                                }}
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <DropdownField name="cityId"
                                                options={cities}
                                                showArrow={editable}
                                                disabled={editable && !values.stateId && !values.state?.id}
                                                value={values?.cityId || values.city?.id}
                                                className={"input-field " + (editable ? "editable" : null)}
                                                onChange={(value) => { setFieldValue("cityId", value) }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="labels">
                                        <Col span={8}>
                                            Pincode
                                        </Col>
                                        <Col span={8}>
                                            Address
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="pinCode"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={15} offset={1}>
                                            {editable ? <CustomInput
                                                className={"input-field editable"}
                                                placeholder="-"
                                                name="addressLine1"
                                                type="text"
                                            /> :
                                                <div className={"input-field"}>
                                                    {donor?.addressLine1}
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="labels">
                                        <Col span={8}>
                                            Father/Husband name
                                        </Col>
                                        <Col span={8}>
                                            <i className={'icon-mail'} /> Email
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="guardianName"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={15} offset={1}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="email"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="labels">
                                        <Col span={7}>
                                            PAN Number
                                        </Col>
                                        <Col span={7} offset={1}>
                                            ID Type
                                        </Col>
                                        <Col span={8} offset={1}>
                                            ID Number
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="pan"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <DropdownField name="identificationCardId"
                                                options={ids}
                                                showArrow={editable}
                                                value={values?.identificationCardId || values.identificationCard?.id}
                                                className={"input-field " + (editable ? "editable" : null)}
                                                onChange={(value:any) => { setFieldValue("identificationCardId", value) }}
                                            />
                                        </Col>
                                        <Col span={8} offset={1}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="identificationCardValue"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="labels">
                                        <Col span={7}>
                                            Gender
                                        </Col>
                                        <Col span={8} offset={1}>
                                            Age
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7} >
                                            <DropdownField name="genderId"
                                                options={genders}
                                                showArrow={editable}
                                                value={values?.genderId || values.gender?.id}
                                                className={"input-field " + (editable ? "editable" : null)}
                                                onChange={(value) => { setFieldValue("genderId", value) }}
                                            />
                                        </Col>
                                        <Col span={8} offset={1}>
                                            <CustomInput
                                                className={"input-field " + (editable ? "editable" : null)}
                                                placeholder="-"
                                                name="age"
                                                type="text"
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            }
                        </Formik>
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}

export default DonorBasicInfo;