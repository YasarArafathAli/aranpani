import {serializable, alias, primitive, object, list, custom} from 'serializr';
import {ProjectDocuments,ProjectAttachment,ProjectActivityModel,ProjectBlog} from './project.help.model'

export class Project {
    @serializable(alias('id', primitive()))
    id?: string;

    @serializable(alias('status', primitive()))
    status?: string;

    @serializable(alias('reg_number', primitive()))
    registrationNumber?: string;

    @serializable(alias('name', primitive()))
    name?: string;

    @serializable(alias('incharge_name', primitive()))
    inchargeName?: string;

    @serializable(alias('incharge_mobile_number', primitive()))
    inchargeMobileNumber?: string;

    @serializable(alias('location', primitive()))
    location?: string;

    @serializable(alias('location_tamil_name', primitive()))
    locationTamilName?: string;

    @serializable(alias('start_date', primitive()))
    startDate?: string;

    @serializable(alias('end_date', primitive()))
    endDate?: string;

    @serializable(alias('estimated_amt', primitive()))
    estimatedAmount?: number;

    @serializable(alias('expensed_amt', primitive()))
    expensedAmount?: number;

    @serializable(alias('progress', primitive()))
    progress?: number;

    @serializable(alias('temple_name_tamil', primitive()))
    templeNameTamil?: string;

    @serializable(alias('temple_incharge_name_tamil', primitive()))
    templeInchargeNameTamil?: string;

    @serializable(alias('lat', primitive()))
    lat?: number;

    @serializable(alias('long', primitive()))
    long?: number;

    @serializable(alias('completion', primitive()))
    completion?: number;

    @serializable(alias('project_attachement_url', primitive()))
    projectAttachementUrl?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('project_attachments', list(object(ProjectAttachment))))
	projectAttachments?: ProjectAttachment[] = [];

	@serializable(alias('project_attachment_ids', list(primitive())))
	projectAttachmentIds?: string[] = [];

	@serializable(alias('project_document_ids', list(primitive())))
	projectDocumentIds?: string[] = [];

	@serializable(alias('project_documents', list(object(ProjectDocuments))))
	projectDocuments?: ProjectDocuments[] = [];

	@serializable(alias('project_blogs', list(object(ProjectBlog))))
	projectBlogs?: ProjectBlog[] = [];
    @serializable(alias('reason', primitive()))
    reason?: string;

    @serializable(alias('project_id', primitive()))
    projectId?: string;

    @serializable(alias('image', custom((file) => file, () => {})))
    image?: File;

    @serializable(alias('document', custom((file) => file, () => {})))
    document?: File;

}
