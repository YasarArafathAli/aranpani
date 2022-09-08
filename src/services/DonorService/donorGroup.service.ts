import { generatePath } from 'react-router-dom';
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import { DonorModel, GroupDonorContributor } from "../../models/donors.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { PaymentModel, PaymentStatsModel } from "../../models/payment.model";

const DonorGroupService = () => {

    const [donorGroupLoading, setDonorGroupLoading] = useState<boolean>(false);
    const [donorButtonLoading, setDonorButtonLoading] = useState<boolean>(false);
    const [donorGroupList, setDonorGroupList] = useState<GroupDonorContributor[]>([]);

    const fetchDonorGroupMembers = async (donorId: string) => {
        try {
            setDonorGroupLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.DONOR_GROUP_MEMBERS, { donorId }));
            const donors: any = deserialize(GroupDonorContributor, data['group_donor_contributors']);
            setDonorGroupList(donors);
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorGroupLoading(false);
        }
    };

    const fetchDonorGroupMemberWithMobileNumber = async (params: { mobile_number: string, isd_code: string }) => {
        try {
            const { data } = await axiosInstance.get(ApiRoutes.DONORS_FIND, { params });
            const donor = deserialize(DonorModel, data['donors']) as DonorModel[]
            return donor
        } catch (error) {
            console.log("donor", error)
        }
    };

    const createDonorGroupMember = async (donorId: string, groupMember: GroupDonorContributor) => {
        setDonorButtonLoading(true);
        try {
            const payload = {
                group_donor_contributor: serialize(GroupDonorContributor, groupMember)
            }
            const { data } = await axiosInstance.post(generatePath(ApiRoutes.DONOR_GROUP_MEMBERS, { donorId }), payload);
            return data
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorButtonLoading(false);
        }
    };

    const updateDonorGroupMember = async (donorId: string, memberId: number, groupMember: GroupDonorContributor) => {
        setDonorButtonLoading(true);
        try {
            const payload = {
                donor: serialize(GroupDonorContributor, groupMember)
            }
            const API_URL = generatePath(ApiRoutes.DONOR_GROUP_MEMBERS, { donorId }) + `/${memberId}`
            const { data } = await axiosInstance.put(API_URL, payload);
            Notification({
                message: "Donor updated successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return data
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorButtonLoading(false);
        }
    };

    const deleteDonorGroupMember = async (donorId: string, memberId: number) => {
        setDonorButtonLoading(true);
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_GROUP_MEMBERS, { donorId }) + `/${memberId}`
            const { data } = await axiosInstance.delete(API_URL);
            Notification({
                message: "Donor deleted successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return data
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorButtonLoading(false);
        }
    };

    const promoteAsFamilyHead = async (donorId: string, memberId: string) => {
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_GROUP_MEMBERS_PROMOTE, { donorId, memberId })
            const response = await axiosInstance.put(API_URL)
            return response.data.success
        } catch (error) {

        }
    }

    const promoteAsIndividualDonor = async (donorId: string, memberId: string) => {
        setDonorButtonLoading(true)
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_GROUP_MEMBERS_INDIVIDUAL_DONOR, { donorId, memberId })
            const response = await axiosInstance.put(API_URL)
            return response.data.success
        } catch (error) {

        } finally {
            setDonorButtonLoading(false)
        }
    }

    return {
        fetchDonorGroupMembers,
        donorGroupList,
        createDonorGroupMember,
        donorGroupLoading,
        donorButtonLoading,
        promoteAsFamilyHead,
        promoteAsIndividualDonor,
        updateDonorGroupMember,
        deleteDonorGroupMember,
        fetchDonorGroupMemberWithMobileNumber,
    }
}

export default DonorGroupService;