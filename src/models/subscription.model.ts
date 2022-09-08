import {serializable, alias, object, list, primitive, custom} from 'serializr';

export class SubscriptionModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('amount', primitive()))
    amount?: number;

    @serializable(alias('name', primitive()))
    name?: string;

    @serializable(alias('status', primitive()))
    status?: boolean;

    @serializable(alias('period', primitive()))
    period?: string;

    @serializable(alias('total_subscibers', primitive()))
    totalSubscribers?: string;

}