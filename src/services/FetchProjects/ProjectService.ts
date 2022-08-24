import axiosInstance from "../../interceptor/axiosInstance";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";

const ProjectService = () => {
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    const fetchProjects = () => {
        setLoading(true);
        return axiosInstance
            .get(ApiRoutes.FETCH_PROJECTS)
            .then((res) => {
                console.log(res)
                console.log("success")
            })
            .catch((error) => {
                setError(error);
                console.log(error);
            })
            .finally(() => setLoading(false))


    }
    return {fetchProjects}
}

export default ProjectService;