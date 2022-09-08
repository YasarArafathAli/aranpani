import { DonorModel } from './donors.model';
import { serializable, alias, object, list, primitive } from 'serializr';
import { MetaModel } from './meta.model';

export class PaymentGroupMembers {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('payment_id', primitive()))
    paymentId?: number;

    @serializable(alias('user_type', primitive()))
    userType?: string;

    @serializable(alias('user_id', primitive()))
    userId?: number;

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('grp_member_amount', primitive()))
    grpMemberAmount?: number;

}

export class PaymentModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('id', primitive()))
    key?: number;

    @serializable(alias('donor_id', primitive()))
    donorId?: number;

    @serializable(alias('reg_number', primitive()))
    regNumber?: string;

    @serializable(alias('representative_id', primitive()))
    representativeId?: number;

    @serializable(alias('payment_mode', primitive()))
    paymentMode?: string;

    @serializable(alias('date', primitive()))
    date?: string;

    @serializable(alias('transaction_id', primitive()))
    transactionId?: string;

    @serializable(alias('is_online', primitive()))
    isOnline?: boolean;

    @serializable(alias('amount', primitive()))
    amount?: number;

    @serializable(alias('group_id', primitive()))
    groupId?: number;

    @serializable(alias('donor_name', primitive()))
    donorName?: string;

    @serializable(alias('representative_name', primitive()))
    representativeName?: string;

    @serializable(alias('one_time_payment', primitive()))
    oneTimePayment?: boolean;

    @serializable(alias('status', primitive()))
    status?: string = 'payment_completed';

    @serializable(alias('generate_invoice', primitive()))
    generateInvoice?: string;

    @serializable(alias('invoice_url', primitive()))
    invoiceUrl?: string;

    @serializable(alias('role', primitive()))
    role?: string;

    @serializable(alias('donor', object(DonorModel)))
    donor?: DonorModel;

    @serializable(alias('representative', object(DonorModel)))
    representative?: DonorModel;

    @serializable(alias('contributor', object(DonorModel)))
    contributor?: DonorModel;

    @serializable(alias('state_id', primitive()))
    stateId?: number;

    @serializable(alias('city_id', primitive()))
    cityId?: number;

    @serializable(alias('country_id', primitive()))
    countryId?: number;


    @serializable(alias('country_name', primitive()))
    countryName?: string;

    @serializable(alias('state', object(MetaModel)))
    state?: MetaModel;

    @serializable(alias('city', object(MetaModel)))
    city?: MetaModel;

    @serializable(alias('country', object(MetaModel)))
    country?: MetaModel;

    @serializable(alias('address_line1', primitive()))
    addressLine1?: string;

    @serializable(alias('address_line2', primitive()))
    addressLine2?: string;

    @serializable(alias('pan', primitive()))
    pan?: string;

    @serializable(alias('pincode', primitive()))
    pinCode?: string;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('isd_code', primitive()))
    isdCode?: string = "+91";

    @serializable(alias('representative_reg_number', primitive()))
    representativeRegNumber?: string;

    @serializable(alias('paid_by_rep', primitive()))
    paidByRep?: boolean;

    @serializable(alias('profile_pic_url', primitive()))
    profilePicUrl?: string;

    @serializable(alias('payment_group_members', list(object(PaymentGroupMembers))))
    paymentGroupMembers?: PaymentGroupMembers[] = [];

    @serializable(alias('otp', primitive()))
    otp?: string;

    @serializable(alias('otp_id', primitive()))
    otpId?: number;

    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('gender_id', primitive()))
    genderId?: string;

    @serializable(alias('age', primitive()))
    age?: string;

    @serializable(alias('identification_card_value', primitive()))
    identificationCardValue?: string;

    @serializable(alias('identification_card_id', primitive()))
    identificationCardId?: string;

    @serializable(alias('identification_card', object(MetaModel)))
    identificationCard?: MetaModel;

    @serializable(alias('gender', object(MetaModel)))
    gender?: MetaModel;

}

export class PaymentStatsModel {

    @serializable(alias('one_time_payments', primitive()))
    oneTimePayments: number = 0;

    @serializable(alias('month_donations_count', primitive()))
    monthDonationsCount: number = 0;

    @serializable(alias('month_donations_value', primitive()))
    monthDonationsValue: number = 0;

    @serializable(alias('offline_donations_value', primitive()))
    offlineDonationsValue: number = 0;

    @serializable(alias('offline_donations_count', primitive()))
    offlineDonationsCount: number = 0;

    @serializable(alias('pending_from_rep_value', primitive()))
    pendingFromRepValue: number = 0;

    @serializable(alias('pending_from_rep_count', primitive()))
    pendingFromRepCount: number = 0;

    @serializable(alias('online_donations_value', primitive()))
    onlineDonationsValue: number = 0;

    @serializable(alias('online_donations_count', primitive()))
    onlineDonationsCount: number = 0;

    @serializable(alias('not_paid_value', primitive()))
    notPaidValue: number = 0;

    @serializable(alias('not_paid_count', primitive()))
    notPaidCount: number = 0;

    @serializable(alias('total_amount', primitive()))
    totalDonations: number = 0;

    @serializable(alias('financial_year_amount', primitive()))
    financialYearDonations: number = 0;

}