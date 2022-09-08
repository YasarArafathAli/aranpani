import axiosInstance from "../../interceptor/axiosInstance";
import {ApiRoutes} from "../../routes/routeConstants/apiRoutes";
import {deserialize, serialize} from "serializr";
import {useState} from "react";
import {convertJSONToFormData} from "../../shared/utils/dataFormatConverter";
import {ProjectAttachment} from "../../models/project.help.model";
import {generatePath} from "react-router-dom";
import {ProjectActivityModel} from "../../models/project.help.model";

const ProjectActivityService = () => {

    const [activityLoading, setActivityLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [activityList, setActivityList] = useState<ProjectActivityModel[]>([]);

    const createActivityAttachment = async (file:File) => {
        try {
            const payload = {
                project_blog_attachment: {attachment: file}
            }
            const formDataPayload = convertJSONToFormData(payload)
            const { data } = await axiosInstance.post(ApiRoutes.PROJECT_BLOG_ATTACHMENTS,formDataPayload);
            if(data){
                return deserialize(ProjectAttachment,data['project_blog_attachment'])
            }
            return null
        } catch (error) {
            console.log("activity attachment create",error)
        } finally {
        }
    };

    const fetchProjectActivities = async (projectId:string) => {
        try {
            setActivityLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.PROJECT_BLOGS,{projectId}));
            const activities:any = deserialize(ProjectActivityModel, data['project_blogs']);
            setActivityList(activities);
        } catch (error) {
            console.log("fetch activity list",error)
        } finally {
            setActivityLoading(false);
        }
    };

    const createProjectActivity = async (projectId:string, projectActivity:ProjectActivityModel) => {
        try {
            setButtonLoading(true);
            const payload = {
                project_blog: serialize(ProjectActivityModel, projectActivity)
            }
            const { data } = await axiosInstance.post(generatePath(ApiRoutes.PROJECT_BLOGS,{projectId}),payload);
            return data['project_blog']
        } catch (error) {
            console.log("create activity list",error)
        } finally {
            setButtonLoading(false);
        }
    };

    const updateProjectActivity = async (projectId:string, projectActivity:ProjectActivityModel,id?:number) => {
        try {
            setButtonLoading(true);
            const payload = {
                project_blog: serialize(ProjectActivityModel, projectActivity)
            }
            const { data } = await axiosInstance.put(
                generatePath(ApiRoutes.PROJECT_BLOGS,{projectId})+`/${id}`,
                payload
            );
            return data['project_blog']
        } catch (error) {
            console.log("update activity list",error)
        } finally {
            setButtonLoading(false);
        }
    };

    return{
        activityList,
        activityLoading,
        createActivityAttachment,
        fetchProjectActivities,
        createProjectActivity,
        updateProjectActivity,
        buttonLoading
    }
}

export default ProjectActivityService;