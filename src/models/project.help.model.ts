import {serializable, alias, primitive, object, list, custom} from 'serializr';


export class ProjectDocuments {
    @serializable(alias('id', primitive()))
    id: string = '';

    @serializable(alias('status', primitive()))
    documentUrl: string = '';
}

export class ProjectAttachment { 

	@serializable(alias('id', primitive()))
	id: string = "";

	@serializable(alias('image_url', primitive()))
	imageUrl: string = "";

}

export class ProjectBlogAttachment { 

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('image_url', primitive()))
	imageUrl?: string;

}
export class ProjectActivityModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('content_english', primitive()))
    contentEnglish?: string;

    @serializable(alias('content_tamil', primitive()))
    contentTamil?: string;

    @serializable(alias('project_blog_attachments', list(object(ProjectAttachment))))
    attachments?: ProjectAttachment[] = [];

    @serializable(alias('project_blog_attachment_ids', list(primitive())))
    attachmentIds?: string[] = [];

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

}

export class ProjectBlog { 

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('content_english', primitive()))
	contentEnglish?: string;

	@serializable(alias('content_tamil', primitive()))
	contentTamil?: string;

	@serializable(alias('project_blog_attachments', list(object(ProjectBlogAttachment))))
	projectBlogAttachments?: ProjectBlogAttachment[] = [];

	@serializable(alias('updated_at', primitive()))
	updatedAt?: string;

	@serializable(alias('created_at', primitive()))
	createdAt?: string;

}

