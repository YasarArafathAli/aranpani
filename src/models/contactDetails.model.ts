import {serializable, alias, primitive} from 'serializr';

export class ContactDetailsModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('mobile_number_isd_code', primitive()))
    mobileNumberIsdCode?: string;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('otp_mobile_number_isd_code', primitive()))
    otpMobileNumberIsdCode?: string;

    @serializable(alias('otp_mobile_number', primitive()))
    otpMobileNumber?: string;

    @serializable(alias('email', primitive()))
    emailId?: string;

}