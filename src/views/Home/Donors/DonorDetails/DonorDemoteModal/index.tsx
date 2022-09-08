import { Button, Card, Modal } from 'antd';
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import React, { FC } from 'react';
import DonorRepDropdown from '../../DonorRepDropdown';
import Error from '../../../../../shared/components/Error';
import DonorService from '../../../../../services/DonorService/DonorService';
import { DonorModel } from '../../../../../models/donors.model';

interface DonorDemoteModalProps {
  visible: boolean;
  donor?: DonorModel;
  closeHandler: (success?: boolean) => void;
}
const DonorDemoteModal: FC<DonorDemoteModalProps> = (props) => {
  const { donor, visible, closeHandler } = props;

  const { demoteAsDonor, donorSubmitting } = DonorService();

  const handleSubmit = async (values: FormikValues) => {
    if (!donor?.id) return;
    const response = await demoteAsDonor(donor.id.toString(), values.repId);
    closeHandler(!!response);
  };

  return (
    <div className="donor-demote-modal">
      <Modal
        title={
          <div className="modal-title">
            <div>
              <h2>Assign alternative representative</h2>
              <div className="sub-title">
                Assign alternative representative to demote the rep
              </div>
            </div>
            <div className="modal-controls">
              <i className="icon-close" onClick={() => closeHandler()} />
            </div>
          </div>
        }
        visible={visible}
        onCancel={() => closeHandler()}
        className="donor-demote-modal__body"
      >
        <Formik initialValues={{ repId: null }} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <div className="form-field">
                  <Card>
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
                  </Card>
                </div>
                <div className="form-field mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={donorSubmitting}
                    disabled={!values.repId}
                  >
                    Save and Proceed
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

export default DonorDemoteModal;
