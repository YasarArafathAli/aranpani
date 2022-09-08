import { generatePath } from 'react-router-dom';
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import {ContactDetailsModel} from "../../models/contactDetails.model";

const ContactDetailService = () => {

    const [contactDetailsLoading, setContactDetailsLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [contactDetails, setContactDetails] = useState<ContactDetailsModel>();

    const fetchContactDetails = async () => {
        try {
            setContactDetailsLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.CONTACT_DETAILS_VIEW));
            const donors = deserialize(ContactDetailsModel, data['admin_contact']);
            setContactDetails(donors);
        } catch (error) {
            console.log("contact details fetch", error)
        } finally {
            setContactDetailsLoading(false);
        }
    };

    const updateContactDetails = async (contactDetails: ContactDetailsModel ) => {
        setButtonLoading(true);
        try {
            const payload = {
                admin_contact: serialize(ContactDetailsModel, contactDetails)
            }
            const API_URL = generatePath(ApiRoutes.CONTACT_DETAILS_UPDATE)
            const { data } = await axiosInstance.put(API_URL, payload);
            Notification({
                message: "Updated contact details successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return data
        } catch (error) {
            console.log("update contact details", error)
        } finally {
            setButtonLoading(false);
        }
    };

    return {
        fetchContactDetails,
        updateContactDetails,
        contactDetails,
        contactDetailsLoading,
        buttonLoading
    }
}

export default ContactDetailService;