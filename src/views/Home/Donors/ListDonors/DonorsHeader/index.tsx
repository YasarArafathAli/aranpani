import React, { FC, useState } from 'react';
import './listDonorsHeader.scss';
import AppHeader from '../../../../../shared/components/AppHeader';
import DonorRequest from './DonorRequest';
import { message } from 'antd';
import DonorService from '../../../../../services/DonorService/DonorService';

interface ListDonorsHeaderProps {
  setCreateModalVisible: Function;
  successHandler: Function;
  selectedDonorIds?: number[];
}

const ListDonorsHeader: FC<ListDonorsHeaderProps> = (props) => {
  const {
    successHandler,
    setCreateModalVisible,
    selectedDonorIds,
  } = props;

  const [showInviteDonor, setShowInviteDonor] = useState<boolean>(false);
  const [showDonorRequest, setShowDonorRequest] = useState<boolean>(false);
  const [showAssignRep, setShowAssignRep] = useState<boolean>(false);
  const [showHeadRequest, setShowHeadRequest] = useState<boolean>(false);

  const assignRepOpenHandler = () => {
    if (!selectedDonorIds?.length)
      return message.warn('Select atleast one donor to assign representative');
    setShowAssignRep(true);
  };

  const assignRepCloseHandler = (success?: boolean) => {
    setShowAssignRep(false);
    success && successHandler();
  };

  return (
    <div className="list-donors-header">
      <div className="header">
        <AppHeader title={'Donor'} setFormVisible={setCreateModalVisible} />
        <div className="donor-actions">
          <span className="project-suggestion" onClick={assignRepOpenHandler}>
            <i className="icon-rep" />
            <p>Assign Rep</p>
          </span>
          <span
            className="project-suggestion"
   
          >
            <i className="icon-donor" />
            <p>Donor Request</p>
          </span>
          <span
            className="project-suggestion"
            //onClick={()=>setShowHeadRequest(true)}
          >
            <i className="icon-promote-to-ind-donor" />
            <p>Promote as head request</p>
          </span>
          <span
            className="project-suggestion"
            //onClick={()=>setShowInviteDonor(true)}
          >
            <i className="icon-mail" />
            <p>Invite Donor</p>
          </span>
        </div>
      </div>

      

      <DonorRequest
        showModal={showDonorRequest}
        setShowModal={setShowDonorRequest}
        title={'Promote to individual donor'}
        info={'This group member will be promoted to individual donor'}
        icon={'donor'}
      />

      

      
    </div>
  );
};

export default ListDonorsHeader;
