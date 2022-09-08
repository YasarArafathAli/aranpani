import React, { FC, useEffect, useState } from 'react';
import './donorForm.scss';
import { Button, Modal, Radio, Switch } from 'antd';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import CustomInput from '../../../../shared/components/CustomInput';
import DropdownField from '../../../../shared/components/DropdownField';
import TextareaField from '../../../../shared/components/TextareaField';
import OtpField from '../../../../shared/components/OtpField';
import CustomCard from '../../../../shared/components/CustomCard';
import { createDonorValidation } from './createDonorValidation';
import DonorSubscriptionDropdown from '../DonorSubscriptionDropdown';
import Error from '../../../../shared/components/Error';
import DonorRepDropdown from '../DonorRepDropdown';
import { DonorModel } from '../../../../models/donors.model';
import DonorService from '../../../../services/DonorService/DonorService';
import {
  GenderModel,
  MetaModel,
  OptionModel,
} from '../../../../models/meta.model';
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes';
import MetaService from '../../../../services/MetaService/meta.service';
import PhoneNumberInput from '../../../../shared/components/PhoneNumberInput';
import { parsePhoneNumber } from 'react-phone-number-input';
import RadioComponent from '../../../../shared/components/RadioComponent';

interface DonorFormProps {
  showModal: boolean;
  setShowModal: Function;
}

const DonorForm: FC<DonorFormProps> = ({ showModal, setShowModal }) => {
  const { fetchMeta } = MetaService();

  const [initialValues, setInitialValues] = useState<DonorModel>(
    new DonorModel()
  );

  const [cities, setCities] = useState<OptionModel[]>([]);

  const [states, setStates] = useState<OptionModel[]>([]);

  const [countries, setCountries] = useState<OptionModel[]>([]);

  const [genders, setGenders] = useState<OptionModel[]>([]);

  const [ids, setIds] = useState<OptionModel[]>([]);

  const { createDonor, donorSubmitting } = DonorService();

  useEffect(() => {
    fetchMeta(ApiRoutes.GENDERS, setGenders, 'genders', {}, GenderModel);
    fetchMeta(ApiRoutes.META_COUNTRIES, setCountries, 'countries');
    fetchMeta(ApiRoutes.IDENTIFICATION_CARDS, setIds, 'identification_cards');
  }, []);

  const handleSubmit = async (
    values: DonorModel,
    helpers: FormikHelpers<DonorModel>
  ) => {
    let response;
    if (values?.id) {
    } else {
      response = await createDonor({
        ...values,
        isdCode: values.mobileNumber
          ? '+' +
            parsePhoneNumber(values.mobileNumber || '')?.countryCallingCode
          : values.isdCode,
        mobileNumber: values.mobileNumber
          ? (parsePhoneNumber(values.mobileNumber || '')
              ?.nationalNumber as string)
          : values.isdCode,
      });
    }
    if (!response) return;
    helpers.resetForm();
    setShowModal(true);
  };

  return (
    <div className="donor-form">
      <Modal
        title={
          <div className="modal-title">
            <h2>New Donor</h2>
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
          validationSchema={createDonorValidation}
        >
          {({ values, setFieldValue, isValid, dirty, errors }) => {
            return (
              <Form className="create-project-form create-internal-user">
                <div className="form-field">
                  <CustomInput
                    type="text"
                    name="username"
                    placeholder="Type name"
                    title="Donor name"
                  />
                </div>
                <div className="form-field">
                  <PhoneNumberInput
                    title="Phone Number"
                    name={'mobileNumber'}
                    value={values.mobileNumber}
                    onChange={(value:any) => setFieldValue('mobileNumber', value)}
                  />
                </div>
                <div className="form-field">
                  <CustomInput
                    type="email"
                    name="emailId"
                    placeholder="Type email"
                    title="Email Id"
                  />
                </div>
                <div className="form-field">
                  <CustomInput
                    type="text"
                    name="guardianName"
                    placeholder="Type Father/Husabnd name"
                    title="Father/Husband name"
                  />
                </div>
                <div className="form-field">
                  <DropdownField
                    name="countryId"
                    options={countries}
                    placeHolder="Select Country"
                    showArrow={true}
                    value={values?.countryId || values.country?.id}
                    className="statusId__dropdown"
                    onChange={(value:any, option:any) => {
                      setFieldValue('countryId', value);
                      setFieldValue('countryName', option.label);
                      if (
                        values.countryName?.toLowerCase()?.includes('india')
                      ) {
                        setFieldValue('stateId', undefined);
                        setFieldValue('cityId', undefined);
                      }
                      fetchMeta(ApiRoutes.META_STATES, setStates, 'states', {
                        country_id: value,
                      });
                    }}
                    title="Country"
                  />
                </div>
                {values.countryName &&
                  values.countryName?.toLowerCase()?.includes('india') && (
                    <div className="form-field">
                      <DropdownField
                        name="stateId"
                        options={states}
                        placeHolder="Select state"
                        showArrow={true}
                        disabled={!values.country?.id && !values.countryId}
                        value={values?.stateId || values.state?.id}
                        className="statusId__dropdown"
                        onChange={(value:any) => {
                          setFieldValue('stateId', value);
                          fetchMeta(
                            ApiRoutes.META_CITIES,
                            setCities,
                            'cities',
                            { state_id: value }
                          );
                        }}
                        title="State"
                      />
                    </div>
                  )}
                {values.countryName &&
                  values.countryName?.toLowerCase()?.includes('india') && (
                    <div className="form-field">
                      <DropdownField
                        name="cityId"
                        options={cities}
                        placeHolder="Select city"
                        showArrow={true}
                        disabled={!values.state?.id && !values.stateId}
                        value={values?.cityId || values.city?.id}
                        className="statusId__dropdown"
                        onChange={(value:any) => {
                          setFieldValue('cityId', value);
                        }}
                        title="District"
                      />
                    </div>
                  )}
                <div className="form-field">
                  <OtpField
                    name="pinCode"
                    title="Pincode"
                    numInputs={6}
                    onChange={(value: any) => {
                      setFieldValue('pinCode', value);
                    }}
                  />
                </div>
                <div className="form-field">
                  <TextareaField
                    title="Address"
                    rows={3}
                    placeholder="Type address"
                    name="addressLine1"
                  />
                </div>
                <div className="form-field">
                  <RadioComponent name="genderId" options={genders} />
                </div>
                <div className="form-field">
                  <DropdownField
                    name="identificationCardId"
                    options={ids}
                    placeHolder="Select ID Cards"
                    showArrow={true}
                    value={values?.identificationCardId}
                    className="statusId__dropdown"
                    onChange={(value:any) => {
                      setFieldValue('identificationCardId', value);
                    }}
                    title="ID Card"
                  />
                </div>
                <div className="form-field">
                  <CustomInput
                    type="text"
                    name="identificationCardValue"
                    placeholder="Type ID Card number"
                    title="ID Card Number"
                  />
                </div>
                <div className="form-field">
                  <CustomInput
                    type="text"
                    name="pan"
                    placeholder="Type PAN number"
                    title="PAN Number"
                  />
                </div>
                <div className="form-field">
                  <CustomInput
                    type="number"
                    name="age"
                    placeholder="Type Age"
                    title="Age"
                  />
                </div>
                <div className="form-field">
                  <label>Subscription</label>
                  <Field name={'donarSubscriptionSchema.subscriptionSchemeId'}>
                    {() => (
                      <>
                        <DonorSubscriptionDropdown
                          value={
                            values?.donarSubscriptionSchema
                              ?.subscriptionSchemeId
                          }
                          onChange={(value: number) => {
                            setFieldValue(
                              'donarSubscriptionSchema.subscriptionSchemeId',
                              value
                            );
                          }}
                        />
                        <ErrorMessage
                          name={'donarSubscriptionSchema.subscriptionSchemeId'}
                        >
                          {(message: string) => <Error message={message} />}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </div>
                <div className="form-field">
                  <label>Representative</label>
                  <CustomCard>
                    <Field name={'repId'}>
                      {() => (
                        <>
                          <DonorRepDropdown
                            value={values?.repId}
                            onChange={(value: number) => {
                              setFieldValue('repId', value);
                            }}
                          />
                          <ErrorMessage name={'repId'}>
                            {(message: string) => <Error message={message} />}
                          </ErrorMessage>
                        </>
                      )}
                    </Field>
                  </CustomCard>
                </div>
                <div className="form-field">
                  <Field name="status">
                    {() => (
                      <div
                        className={`internal-user-status ${
                          values?.status ? 'active' : 'inactive'
                        }`}
                      >
                        <span className="font-bold">
                          {values?.status ? 'Active' : 'Inactive'}
                        </span>
                        <Switch
                          defaultChecked
                          checked={!!values?.status}
                          onChange={(checked) => {
                            setFieldValue('status', checked ? 1 : 0);
                          }}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="form-field">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={donorSubmitting}
                    disabled={!isValid || !dirty}
                  >
                    Create donor
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default DonorForm;
