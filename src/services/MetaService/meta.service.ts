import { Dispatch, useState } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import { ClazzOrModelSchema, deserialize, ModelSchema } from "serializr";
import { MetaModel, OptionModel } from "../../models/meta.model";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { convertJSONToFormData } from "../../shared/utils/dataFormatConverter";

const MetaService = () => {

    const [uploading, setUploading] = useState<boolean>(false)

    const fetchMeta = (metaUrl: string, setStateFn: Dispatch<OptionModel[]>, key: string, params?:any,model?:ClazzOrModelSchema<any>) => {
        return axiosInstance
            .get(metaUrl, { params })
            .then((response) => {
                const meta: any = deserialize(model || OptionModel, response.data[key]);
                setStateFn(meta)
            })
            .catch((error) => {
            })
            .finally(() => {
            });
    }

    const uploadAttachment = async (file: File) => {
        // : Promise<AttachmentModel | undefined> 
        setUploading(true)
        try {
            const payload = {
                attachment: file
            }
            const API_URL = ''
            const response = await axiosInstance.post(API_URL, convertJSONToFormData(payload))
            // return deserialize(AttachmentModel, response.data['uploaded_file'])
        } catch (error) {
        } finally {
            setUploading(false)
        }
    }


    return {
        uploading,
        fetchMeta,
        uploadAttachment,
    }
}

export default MetaService;