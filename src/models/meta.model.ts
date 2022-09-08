import { serializable, alias, primitive } from 'serializr';

export class MetaModel {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('name', primitive()))
    name?: string;

}

export class OptionModel {
    @serializable(alias('id', primitive()))
    value?: number;

    @serializable(alias('name', primitive()))
    label?: string;

}
export class GenderModel {
    @serializable(alias('id', primitive()))
    value?: number;

    @serializable(alias('category', primitive()))
    label?: string;

}