import React, { FC, useEffect } from 'react'
import "./subscriptions.scss"
import AppHeader from "../../../shared/components/AppHeader";
import { Switch } from "antd";
import SubscriptionService from "../../../services/SubscriptionService/subscription.service";
import { SubscriptionModel } from "../../../models/subscription.model";
import Loader from '../../../shared/components/Loader';
import CustomTable from '../../../shared/components/CustomTable';


const Subscriptions = () => {
    
    const { fetchSubscriptionList, subscriptionList, subscriptionLoading, updateSubscriptionStatus } = SubscriptionService();

    useEffect(() => {
        fetchSubscriptionList().then()
    }, [])

    const handleStatusChange = (value: boolean, subscription: SubscriptionModel) => {
        if (!subscription?.id) return
        updateSubscriptionStatus(value, String(subscription?.id))
    };

    const columns = [
        {
            title: "S.NO",
            dataIndex: "id",
            key: "id",
            //render: (_: any, __: any, index: number) => index + 1,
            //sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: "Subscription",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: SubscriptionModel) =>
                <span className="text-capitalize"> {record?.name} </span>
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text: string, record: SubscriptionModel) => <span>₹ {record?.amount}</span>
        },
        {
            title: "Period",
            dataIndex: "period",
            key: "period"
        },
        {
            title: "Total Subscribers",
            dataIndex: "totalSubscribers",
            key: "totalSubscribers",
        },
        {
            title: "",
            dataIndex: "status",
            key: "status",
            render: (text: string, record: SubscriptionModel) =>
                <Switch loading={false}
                    onChange={(value) => handleStatusChange(value, record)}
                    className={`subscription-toggle ${record?.status ? 'active' : 'inactive'}`}
                    defaultChecked={record?.status}
                //checked={record?.status}
                />
        },
    ];

    return (
        <div className="subscriptions">
            <div className="header">
                <AppHeader title={"Subscription"}
                    setFormVisible={() => { }}
                    disableAdd={true}
                />
            </div>
            {
                subscriptionLoading
                    ? <Loader />
                    : <CustomTable title={''}
                        handleSearch={() => { }}
                        columns={columns}
                        loading={subscriptionLoading}
                        data={subscriptionList}
                        totalRecords={subscriptionList.length}
                        pagination={false}
                    />
            }


        </div>
    )
}

export default Subscriptions;