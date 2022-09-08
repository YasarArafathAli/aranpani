import { generatePath } from 'react-router-dom';
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize } from "serializr";
import { useState } from "react";
import { SubscriptionModel } from "../../models/subscription.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";

const SubscriptionService = () => {

    const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false);
    const [subscriptionList, setSubscriptionList] = useState<SubscriptionModel[]>([]);

    const fetchSubscriptionList = async () => {
        try {
            setSubscriptionLoading(true);
            const { data } = await axiosInstance.get(ApiRoutes.SUBSCRIPTIONS);
            const subscriptions: any = deserialize(SubscriptionModel, data['subscription_schemes']);
            setSubscriptionList(subscriptions);
        } catch (error) {
            console.log("subscription", error)
        } finally {
            setSubscriptionLoading(false);
        }
    };

    const updateSubscriptionStatus = async (value: boolean, id: string) => {
        try {
            const API_URL = generatePath(ApiRoutes.SUBSCRIPTION, { id })
            const payload = {status : value ? 1 : 0}
            await axiosInstance.put(API_URL,payload);
            Notification({
                message: "",
                description: "Subscription status changed",
                type: NotificationTypes.SUCCESS,
            });
        } catch (error) {
            console.log("subscription", error)
        }
    };

    return {
        fetchSubscriptionList,
        subscriptionLoading,
        updateSubscriptionStatus,
        subscriptionList
    }
}

export default SubscriptionService;