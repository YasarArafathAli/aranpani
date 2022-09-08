import React, { FC, useEffect } from 'react';
import './donorPaymentDetails.scss';
import { Col, Collapse, Divider, Row } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DonorService from '../../../../../services/DonorService/DonorService';
import { paymentStatusMeta } from '../../../../../shared/utils/paymentStatus';

const { Panel } = Collapse;

interface DonorPaymentDetailsProps {}

const DonorPaymentDetails: FC<DonorPaymentDetailsProps> = (props) => {
  const {} = props;

  const { id } = useParams();

  const { fetchDonorPayments, donorPayments, donorPaymentStats } =
    DonorService();

  useEffect(() => {
    id && fetchDonorPayments(id).then();
  }, [id]);

  return (
    <div className="donor-payment-details">
      <h3 className="font-semi-bold">Payment Details</h3>
      <div className="payment-stats">
        <Row>
          <Col span={12}>
            <div className="payment-stats__label">Total Donations</div>
            <div className="payment-stats__value font-bold">
              ₹{donorPaymentStats?.totalDonations}
            </div>
          </Col>
          <Col span={12}>
            <div className="payment-stats__label">Financial Year Donation</div>
            <div className="payment-stats__value font-bold">
              ₹{donorPaymentStats?.financialYearDonations}
            </div>
          </Col>
        </Row>
      </div>
      {donorPayments?.map((payment, i) => (
        <Collapse ghost className={'donor-payment-info-collapse'} key={i}>
          <Panel
            header={
              <div className={'donor-payment-info-collapse__header'}>
                <div className={'payment-date-info'}>
                  <div className={'payment-date-info__month'}>
                    {moment(payment?.date).format('MMM,YYYY')}
                  </div>
                  <div className={'sub-title'}>
                    Donated for 1{' '}
                    {payment?.paymentGroupMembers?.length
                      ? '+ ' +
                        payment?.paymentGroupMembers?.length +
                        ' group members'
                      : ''}
                  </div>
                </div>
                <div className={'payment-amount-info'}>
                  <div className={'payment-amount-info__value font-bold'}>
                    ₹{payment?.amount}
                  </div>
                  <div
                    className={`text-capitalize payment-amount-info__status ${payment.status}`}
                  >
                    {payment?.status ? paymentStatusMeta[payment.status] : ''}
                  </div>
                </div>
              </div>
            }
            key="1"
          >
            <Divider className={'donor-payment-info__divider'} />
            <div className={'donor-payment-info-collapse__payment-details'}>
              <div className={'sub-title'}>Payment Info</div>
              <Row>
                <div
                  className={
                    'donor-payment-info-collapse__payment-label font-light'
                  }
                >
                  Date
                </div>
                <div
                  className={
                    'donor-payment-info-collapse__payment-value font-semi-bold'
                  }
                >
                  {moment().format('DD/MM/YYYY')}
                </div>
              </Row>
              <Row>
                <div
                  className={
                    'donor-payment-info-collapse__payment-label font-light'
                  }
                >
                  Mode
                </div>
                <div
                  className={
                    'donor-payment-info-collapse__payment-value font-semi-bold'
                  }
                >
                  {payment?.paidByRep
                    ? 'Paid to rep'
                    : payment?.isOnline
                    ? 'Online'
                    : 'Offline'}
                </div>
              </Row>
              <Row>
                <div
                  className={
                    'donor-payment-info-collapse__payment-label font-light'
                  }
                >
                  Transaction ID
                </div>
                <div
                  className={
                    'donor-payment-info-collapse__payment-value font-semi-bold'
                  }
                >
                  {payment?.transactionId ?? '-'}
                </div>
              </Row>
              <Row>
                <div
                  className={
                    'donor-payment-info-collapse__payment-label font-light'
                  }
                >
                  Paid by
                </div>
                <div
                  className={
                    'donor-payment-info-collapse__payment-value font-semi-bold'
                  }
                >
                  {payment?.donorName ?? '-'}
                </div>
              </Row>
            </div>
            {payment?.paymentGroupMembers &&
              payment?.paymentGroupMembers?.length > 0 && (
                <div className={'donor-payment-info-collapse__split-details'}>
                  <div className={'sub-title'}>Donation Split</div>
                  {payment?.paymentGroupMembers?.map((groupRecord:any, id:any) => (
                    <Row key={i}>
                      <div
                        className={
                          'donor-payment-info-collapse__payment-label font-light'
                        }
                      >
                        {groupRecord?.username}
                      </div>
                      <div
                        className={
                          'donor-payment-info-collapse__payment-value font-semi-bold'
                        }
                      >
                        ₹ {groupRecord?.grpMemberAmount}
                      </div>
                    </Row>
                  ))}
                </div>
              )}
            {payment?.invoiceUrl && (
              <div className={'view-receipt cursor-pointer'}>
                <a href={payment?.invoiceUrl} target={'_blank'}>
                  <i className={'icon-recipt'} /> VIEW RECEIPT
                </a>
              </div>
            )}
          </Panel>
        </Collapse>
      ))}
      {/*{donorPayments?.length > 0 && <div className="view-more cursor-pointer">
                View more
            </div>}*/}
    </div>
  );
};

export default DonorPaymentDetails;
