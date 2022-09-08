import { serializable, alias, object, list, primitive, custom } from 'serializr';

export class PaginationModel {

    @serializable(alias('current_page', primitive()))
    currentPage?: number;

    @serializable(alias('total_number_of_pages', primitive()))
    totalPages?: number;

    @serializable(alias('total_record_count', primitive()))
    totalCount?: number;

}