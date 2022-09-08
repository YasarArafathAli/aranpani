import React, {FC, useEffect} from 'react'
import "./donorSubscriptions.scss"
import CustomCard from "../../../../../shared/components/CustomCard";
import {useParams} from "react-router-dom";
import DonorSubscriptionService from "../../../../../services/DonorService/donorSubscription.service";

interface DonorSubscriptionsProps {
}

const DonorSubscriptions: FC<DonorSubscriptionsProps> = () => {

    const {id} = useParams();

    const { fetchDonorSubscriptions, donorSubscriptionList } = DonorSubscriptionService();

    useEffect(()=>{
        id && fetchDonorSubscriptions((id)).then()
    },[id])

    return (
        <div className="donor-subscriptions">
            <CustomCard>
                <div className="status">
                    <h3 className="title">{donorSubscriptionList?.length} Subscriptions</h3>
                    {donorSubscriptionList?.length > 0 &&
                        <div className="sub-title">Projects which the donor subscribed</div>
                    }
                    {donorSubscriptionList?.map( subscription =>
                        <div className="subscriber mb-1 mt-4" key={subscription.id}>
                            <h3 className="title ml-2">{subscription.name}</h3>
                            <div className="sub-title ml-2">
                                <i className="icon-location"/>
                                {subscription.location}
                            </div>
                        </div>
                    )}
                    {/*<div className="view-more cursor-pointer">
                        Show more
                    </div>*/}
                </div>
            </CustomCard>
        </div>
    )
}

export default DonorSubscriptions;