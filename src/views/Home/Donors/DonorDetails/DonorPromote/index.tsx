import React, { FC, useEffect, useState } from 'react';
import './donorPromote.scss';
import { Switch } from 'antd';
import CustomCard from '../../../../../shared/components/CustomCard';
import DonorService from '../../../../../services/DonorService/DonorService';
import { DonorModel } from '../../../../../models/donors.model';
import { AppRoutes } from '../../../../../routes/routeConstants/appRoutes';
import DonorDemoteModal from '../DonorDemoteModal';

interface DonorPromoteProps {
  donor?: DonorModel;
  refreshDonor: () => void;
}

const DonorPromote: FC<DonorPromoteProps> = ({ donor, refreshDonor }) => {

  const { promoteAsRep } = DonorService();

  const [status, setStatus] = useState<boolean>(
    donor?.roleName === 'representative'
  );

  const [demoteModalVisible, setDemoteModalVisible] = useState<boolean>(false);

  const updatePromotion = async (checked: boolean) => {
    if (!donor?.id) return;
    const response = checked
      ? await promoteAsRep(donor?.id.toString())
      : donorDemoteModalOpenHandler();
    if (response) {
      setStatus(checked);
      refreshDonor();
    }
  };

  const donorDemoteModalOpenHandler = () => {
    setDemoteModalVisible(true);
    return false;
  };

  const donorDemoteModalCloseHandler = (success?: boolean) => {
    setDemoteModalVisible(false);
    success && refreshDonor();
  };

  return (
    <div className="donor-promote">
      <CustomCard>
        {donor?.status ? (
          <div className="donor-promote__content">
            <h3>{status ? 'Promoted ' : 'Promote '} as Area Representative</h3>
            <div className={'sub-title'}>
              {/*{status ? 'Donor will be promoted as area representative'
                            : 'Representative for area 600007'}*/}
              Representative for area {donor?.pinCode}
            </div>
            <div
              className={`donor-promote__action ${
                status ? 'promoted' : 'promote'
              }`}
            >
              <h2 className={'donor-promote__status font-semi-bold'}>
                {status ? 'Promoted' : 'Promote'}
              </h2>
              <Switch
                checked={status}
                onChange={(value) => updatePromotion(value)}
              />
            </div>
          </div>
        ) : (
          <div className="donor-promote__content">
            <h3>Status</h3>
            <div className={'sub-title'}>
              Donor is temporarily removed form the platform
            </div>
            <div className={`donor-promote__action inactive`}>
              <h2 className={'donor-promote__status font-semi-bold'}>
                Inactive
              </h2>
              {/* <Switch checked={status}
                                disabled={!!status}
                                onChange={(value) => updatePromotion(value)}
                            /> */}
            </div>
          </div>
        )}
      </CustomCard>
      <DonorDemoteModal
        donor={donor}
        visible={demoteModalVisible}
        closeHandler={donorDemoteModalCloseHandler}
      />
    </div>
  );
};

export default DonorPromote;
