import { MetaModel } from './meta.model';
import { DonorTypes } from './../enums/donorTypes';
import { DonorClassTypes } from './../enums/donorClassTypes';
import { serializable, alias, object, list, primitive, custom, deserialize } from 'serializr';

export class UserModel {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('isd_code', primitive()))
    isdCode?: string;

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('role_id', primitive()))
    roleId?: number;

    @serializable(alias('role_name', primitive()))
    roleName?: string;

    @serializable(alias('guardian_name', primitive()))
    guardianName?: string;

    @serializable(alias('country', object(MetaModel)))
    country?: MetaModel;

    @serializable(alias('city', object(MetaModel)))
    city?: MetaModel;

    @serializable(alias('state', object(MetaModel)))
    state?: MetaModel;

    @serializable(alias('address_line1', primitive()))
    addressLine1?: string;

    @serializable(alias('address_line2', primitive()))
    addressLine2?: string;

    @serializable(alias('lat', primitive()))
    lat?: string;

    @serializable(alias('lng', primitive()))
    lng?: string;

    @serializable(alias('pincode', primitive()))
    pinCode?: string;

    @serializable(alias('reg_number', primitive()))
    regNumber?: string;

    @serializable(alias('profile_pic_url', primitive()))
    profilePicUrl?: string;

    @serializable(alias('status', primitive()))
    status?: boolean;

    @serializable(alias('total_contributions', primitive()))
    totalContributions?: number;

    @serializable(alias('total_contributions_current_yr', primitive()))
    totalContributionsCurrentYr?: number;

    @serializable(alias('donors_count', primitive()))
    donorsCount?: number;

    @serializable(alias('audit_status', primitive()))
    auditStatus?: boolean;
}

export class GroupModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('group_head', object(UserModel)))
    groupHead?: UserModel;

    @serializable(alias('members', list(object(UserModel))))
    members?: UserModel[];

}

export class DonarSubscriptionSchema {
    @serializable(alias('subscription_scheme_id', primitive()))
    subscriptionSchemeId?: number;

    @serializable(alias('name', primitive()))
    name?: string;

    @serializable(alias('status', primitive()))
    status?: boolean;

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('amount', primitive()))
    amount?: number;
}

export class DonorModel {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('isd_code', primitive()))
    isdCode?: string = "+91";

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('role_id', primitive()))
    roleId?: number;

    @serializable(alias('role_name', primitive()))
    roleName?: string;

    @serializable(alias('guardian_name', primitive()))
    guardianName?: string;

    @serializable(alias('country_id', primitive()))
    countryId?: string;

    @serializable(alias('country_name', primitive()))
    countryName?: string;

    @serializable(alias('state_id', primitive()))
    stateId?: string;

    @serializable(alias('city_id', primitive()))
    cityId?: string;

    @serializable(alias('gender_id', primitive()))
    genderId?: string;

    @serializable(alias('age', primitive()))
    age?: string;

    @serializable(alias('pan', primitive()))
    pan?: string;

    @serializable(alias('identification_card_value', primitive()))
    identificationCardValue?: string;

    @serializable(alias('identification_card_id', primitive()))
    identificationCardId?: string;

    @serializable(alias('country', object(MetaModel)))
    country?: MetaModel;

    @serializable(alias('identification_card', object(MetaModel)))
    identificationCard?: MetaModel;

    @serializable(alias('gender', object(MetaModel)))
    gender?: MetaModel;

    @serializable(alias('city', object(MetaModel)))
    city?: MetaModel;

    @serializable(alias('state', object(MetaModel)))
    state?: MetaModel;

    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('address_line1', primitive()))
    addressLine1?: string;

    @serializable(alias('address_line2', primitive()))
    addressLine2?: string;

    @serializable(alias('lat', primitive()))
    lat?: string;

    @serializable(alias('lng', primitive()))
    lng?: string;

    @serializable(alias('head_reg_number', primitive()))
    headRegNumber?: string;

    @serializable(alias('class_name', primitive()))
    type?: DonorClassTypes;

    @serializable(alias('donor_type', primitive()))
    donorType?: DonorTypes;

    @serializable(alias('pincode', primitive()))
    pinCode?: string;

    @serializable(alias('reg_number', primitive()))
    regNumber?: string;

    @serializable(alias('donor_subscription_scheme', object(DonarSubscriptionSchema)))
    donarSubscriptionSchema?: DonarSubscriptionSchema;

    @serializable(alias('representative_id', primitive()))
    repId?: number;

    @serializable(alias('profile_pic_url', primitive()))
    profilePicUrl?: string;

    @serializable(alias('status', primitive()))
    status?: 0 | 1 = 1;

    @serializable(alias('total_contributions', primitive()))
    totalContributions?: number;

    @serializable(alias('total_contributions_current_yr', primitive()))
    totalContributionsCurrentYr?: number;

    @serializable(alias('representative', object(UserModel)))
    representative?: UserModel;

    @serializable(alias('group', object(GroupModel)))
    group?: GroupModel;

}

export class GroupDonorContributor {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('group_id', primitive()))
    groupId?: number;

    @serializable(alias('user_type', primitive()))
    userType?: string;

    @serializable(alias('user_id', primitive()))
    userId?: number;

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('isd_code', primitive()))
    isdCode?: string;

    @serializable(alias('role', primitive()))
    role?: string;

    @serializable(alias('reg_number', primitive()))
    regNumber?: string;
}