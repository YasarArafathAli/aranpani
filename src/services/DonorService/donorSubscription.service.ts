import { generatePath } from 'react-router-dom';
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import {DonorModel, GroupDonorContributor} from "../../models/donors.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import {PaymentModel, PaymentStatsModel} from "../../models/payment.model";
import {Project} from "../../models/project.model";

const DonorSubscriptionService = () => {

    const [donorSubscriptionLoading, setDonorSubscriptionLoading] = useState<boolean>(false);
    const [donorSubscriptionList, setDonorSubscriptionList] = useState<Project[]>([]);

    const fetchDonorSubscriptions = async (donorId:string) => {
        try {
            setDonorSubscriptionLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.DONOR_SUBSCRIPTIONS,{donorId}));
            const subscriptions: any = deserialize(Project, data['projects']);
            setDonorSubscriptionList(subscriptions);
        } catch (error) {
            console.log("donor subscription", error)
        } finally {
            setDonorSubscriptionLoading(false);
        }
    };

    return {
        fetchDonorSubscriptions,
        donorSubscriptionList,
        donorSubscriptionLoading
    }
}

export default DonorSubscriptionService;