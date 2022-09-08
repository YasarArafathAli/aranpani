import { generatePath } from 'react-router-dom';
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import { DonorModel } from "../../models/donors.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { PaymentModel, PaymentStatsModel } from "../../models/payment.model";
import { RepresentativeDetails } from '../../models/representativeDetails.model';
import { PaginationModel } from '../../models/pagination.model';

const DonorService = () => {

    const [donorLoading, setDonorLoading] = useState<boolean>(false);
    const [donorSubmitting, setDonorSubmitting] = useState<boolean>(false);
    const [donorList, setDonorList] = useState<DonorModel[]>([]);
    const [donorPagination, setDonorPagination] = useState<PaginationModel>();
    const [donor, setDonor] = useState<DonorModel>();
    const [donorPayments, setDonorPayments] = useState<PaymentModel[]>([]);
    const [donorPaymentStats, setDonorPaymentStats] = useState<PaymentStatsModel>();

    const fetchDonorList = async (params: {
        page?: number,
        limit?: number
        search?: string,
        role?: "donor",
        representative_id?: number
    } = {}) => {
        try {
            setDonorLoading(true);
            params.limit = 50
            params.role = "donor"
            const { data } = await axiosInstance.get(ApiRoutes.DONORS, {
                params: {
                    ...params,
                    //  limit: 50
                }
            });
            const donors: any = deserialize(DonorModel, data['donors']);
            setDonorList(donors);
            setDonorPagination(deserialize(PaginationModel, data))
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorLoading(false);
        }
    };
    const createDonor = async (donor: DonorModel) => {
        setDonorSubmitting(true);
        try {
            const payload = {
                donor: serialize(DonorModel, donor)
            }
            const { data } = await axiosInstance.post(ApiRoutes.DONORS, payload);
            return data
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorSubmitting(false);
        }
    };

    const fetchDonor = async (donorId: string) => {
        setDonorLoading(true);
        try {
            const API_URL = generatePath(ApiRoutes.DONOR, { donorId })
            const { data } = await axiosInstance.get(API_URL);
            const donor = deserialize(DonorModel, data?.donor)
            setDonor(donor)
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorLoading(false);
        }
    };

    const updateDonor = async (donor: DonorModel) => {
        setDonorSubmitting(true);
        try {
            const payload = { donor: serialize(DonorModel, donor) }
            const API_URL = generatePath(ApiRoutes.DONOR, { donorId: donor.id?.toString() })
            const { data } = await axiosInstance.put(API_URL, payload);
            const updatedDonor = deserialize(DonorModel, data?.donor)
            setDonor(updatedDonor)
            Notification({
                message: "Donor updated successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return updateDonor
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorSubmitting(false);
        }
    };

    const fetchDonorPayments = async (donorId: string) => {
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_PAYMENTS, { donorId })
            const { data } = await axiosInstance.get(API_URL);
            const payments: any = deserialize(PaymentModel, data?.payments)
            const paymentStats = deserialize(PaymentStatsModel, data?.stats)
            setDonorPayments(payments)
            setDonorPaymentStats(paymentStats)
        } catch (error) {
            console.log("donor", error)
        } finally {
        }
    };

    const deactivateDonor = async (donorId: string) => {
        setDonorSubmitting(true);
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_DEACTIVATE, {donorId })
            await axiosInstance.put(API_URL);
            Notification({
                message: "Donor deactivated successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return true
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorSubmitting(false);
        }
    };

    const promoteAsRep = async (donorId: string ) => {
        try {
            const API_URL = generatePath(ApiRoutes.DONOR_PROMOTE, { donorId })
            const response = await axiosInstance.put(API_URL)
            const data = deserialize(DonorModel, response.data['area_representative'])
            Notification({
                message: "Donor promoted successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return data

        } catch (error) {

        } finally {

        }
    }
    const demoteAsDonor = async (repId: string , new_representative_id: string | number) => {
        setDonorSubmitting(true)
        try {
            const payload = { admin: { new_representative_id } }
            const API_URL = generatePath(ApiRoutes.DONOR_DEMOTE, { repId })
            await axiosInstance.put(API_URL, payload)
            Notification({
                message: "Donor demoted successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return true
        } catch (error) {

        } finally {
            setDonorSubmitting(false)
        }
    }


    const bulkAssignRep = async (representative_id: number, donor_ids: number[]) => {
        setDonorSubmitting(true)
        try {
            const payload = { admin: { representative_id, donor_ids } }
            await axiosInstance.put(ApiRoutes.BULK_ASSIGN_REP, payload)
            Notification({
                message: "Representative assigned successfully",
                type: NotificationTypes.SUCCESS,
                description: ""
            })
            return true
        } catch (error) {

        } finally {
            setDonorSubmitting(false)
        }
    }

    return {
        fetchDonorList,
        donorList,
        donor,
        donorSubmitting,
        createDonor,
        fetchDonor,
        updateDonor,
        donorLoading,
        donorPagination,
        fetchDonorPayments,
        donorPayments,
        promoteAsRep,
        bulkAssignRep,
        demoteAsDonor,
        deactivateDonor,
        donorPaymentStats
    }
}

export default DonorService;