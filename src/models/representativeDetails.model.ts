
import {serializable, alias, object, list, primitive} from 'serializr';

export class RepresentativeDetails { 

	@serializable(alias('reg_number', primitive()))
	regNumber?: string;

	@serializable(alias('role_name', primitive()))
	roleName?: string;

	@serializable(alias('role_id', primitive()))
	roleId?: string;

	@serializable(alias('username', primitive()))
	username?: string;

	@serializable(alias('mobile_number', primitive()))
	mobileNumber?: string;

}