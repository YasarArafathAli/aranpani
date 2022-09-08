import React, { FC, useEffect, useState } from 'react';
import './donorDetails.scss';
import { useParams } from 'react-router-dom';
import Back from '../../../../shared/components/Back';
import CustomCard from '../../../../shared/components/CustomCard';
import DonorHeader from './DonorHeader';
import { Button, Col, Modal, Row } from 'antd';
import DonorBasicInfo from './DonorBasicInfo';
import DonorPaymentDetails from './DonorPaymentDetails';
import DonorSubscriptions from './DonorSubscriptions';
import DonorPromote from './DonorPromote';
import DonorGroupMembers from './DonorGroupMembers';
import DonorSubscriptionDropdown from '../DonorSubscriptionDropdown';
import DonorRepDropdown from '../DonorRepDropdown';
import DonorService from '../../../../services/DonorService/DonorService';
import Loader from '../../../../shared/components/Loader';
import { DonorModel } from '../../../../models/donors.model';

interface DonorDetailsProps {
  hideBack?: boolean;
}

const DonorDetails: FC<DonorDetailsProps> = (props) => {
  const { hideBack } = props;

  const { id } = useParams<{ id: string }>();

  const { fetchDonor, donor, donorLoading, updateDonor, donorSubmitting } =
    DonorService();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedSubscription, setSelectedSubscription] = useState<number>();

  useEffect(() => {
    refreshDonor().then();
  }, [id]);

  const refreshDonor = () => fetchDonor('id').then();

  const updateDonorHandler = async (donor: DonorModel, cb: () => void) => {
    const response = await updateDonor(donor);
    response && cb();
  };

  const subscriptionUpdateHandler = (id: number) => {
    setSelectedSubscription(id);
    setShowConfirmation(true);
  };

  const handleSubscriptionUpdate = () => {
    const updatedDonor = {
      ...donor,
      donarSubscriptionSchema: {
        ...donor?.donarSubscriptionSchema,
        subscriptionSchemeId: selectedSubscription,
      },
    };
    updateDonorHandler(updatedDonor, () => {
      setSelectedSubscription(undefined);
      setShowConfirmation(false);
    }).then();
  };

  const repUpdateHandler = (repId: number) =>
    updateDonorHandler(
      {
        ...donor,
        repId,
      },
      () => {}
    );

  const confirmationModal = (
    <Modal
      title={
        <div className="modal-title">
          <div>
            <h2>Change subscription</h2>
            <div className="sub-title">
              Are you sure to change the subscription?
            </div>
          </div>
          <div className="modal-controls">
            <i
              className="icon-close"
              onClick={() => setShowConfirmation(false)}
            />
          </div>
        </div>
      }
      visible={showConfirmation}
      onCancel={() => setShowConfirmation(false)}
      className="project-complete-modal__body"
      centered
    >
      <Button
        type="primary"
        loading={donorSubmitting}
        onClick={handleSubscriptionUpdate}
        className={'donor-subscription-change-modal__action'}
      >
        Update subscription
      </Button>
    </Modal>
  );

  if (donorLoading) return <Loader />;

  return (
    <div className="donor-details">
      {confirmationModal}

      {!hideBack && <Back name={'Donor'} />}

      <DonorHeader
        donor={donor}
        refreshDonor={refreshDonor}
        updateHandler={updateDonorHandler}
      />

      <Row>
        <Col className="left-col" span={15}>
          <DonorBasicInfo
            refreshDonor={async () => {}}
            donor={donor}
            updateHandler={updateDonorHandler}
          />
          <div className="donor-details__subscription">
            <h3 className="font-semi-bold">Subscription Details</h3>
            <DonorSubscriptionDropdown
              value={donor?.donarSubscriptionSchema?.subscriptionSchemeId}
              onSelect={subscriptionUpdateHandler}
              resetDropdown={!showConfirmation}
            />
          </div>
          <DonorPaymentDetails />
        </Col>

        <Col className="right-col" span={8}>
          <DonorPromote donor={donor} refreshDonor={refreshDonor} />
          {(donor?.roleName === 'donor' ||
            donor?.roleName === 'representative') && (
            <DonorGroupMembers donor={donor} refreshDonor={refreshDonor} />
          )}
          {donor?.roleName === 'donor' && (
            <CustomCard>
              <h3 className="title">Area Representative</h3>
              <DonorRepDropdown
                value={donor?.representative?.id}
                repUpdateHandler={repUpdateHandler}
                donorDetail
              />
            </CustomCard>
          )}
          <DonorSubscriptions />
        </Col>
      </Row>
    </div>
  );
};

export default DonorDetails;
