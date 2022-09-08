import {useState} from "react";
import {Project} from "../../models/project.model";
import {ProjectTypes} from "../../enums/projectTypes";
import axiosInstance from "../../interceptor/axiosInstance";
import {ApiRoutes} from "../../routes/routeConstants/apiRoutes";
import {deserialize} from "serializr";
import {DonorModel} from "../../models/donors.model";
import {generatePath} from "react-router-dom";

const ProjectSubscriberService = () => {

    const [subscribedDonors, setSubscribedDonors] = useState<DonorModel[]>([]);

    const fetchSubscribedDonors = async (projectId: string) => {
        try {
            const {data} = await axiosInstance.get(generatePath(ApiRoutes.PROJECT_SUBSCRIBERS,{projectId}));
            const subscribers:any = deserialize(DonorModel, data['donors']);
            setSubscribedDonors(subscribers);
        } catch (error) {
        } finally {
        }
    };

    return {
        fetchSubscribedDonors,
        subscribedDonors
    }
}

export default ProjectSubscriberService;