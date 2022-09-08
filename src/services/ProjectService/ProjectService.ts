import axiosInstance from "../../interceptor/axiosInstance";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { Project} from "../../models/project.model";
import { ProjectAttachment, ProjectDocuments } from '../../models/project.help.model'
import { serializable, serialize,deserialize } from "serializr";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { convertJSONToFormData } from "../../shared/utils/dataFormatConverter";
const ProjectService = () => {
    const [projects, setProjects] = useState();
    const [project, setProject] = useState<Project>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);
    const fetchProjects = (status:string,params?: {search?: string}) => {
        setLoading(true);
        return axiosInstance
            .get(ApiRoutes.PROJECTS,{
                params: {
                    status:  status.toLowerCase(),
                    ...(params || {})
                }
            })
            .then((res) => {
                setProjects(res.data['projects'])
            })
            .catch((err) => {
                setError(err);
                console.log(error);
            })
            .finally(() => setLoading(false))


    }
    const fetchProject = (id:number) => {
        setLoading(true)
        return axiosInstance
            .get(ApiRoutes.PROJECTS + `/${id}`)
            .then((res) => {
                setProject(res.data.project)
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setLoading(false))
    }
    const createProject = async (project:Project) => {
        try{
            const _project = serialize(Project,project)
            setLoading(true);
            await axiosInstance.post(ApiRoutes.PROJECTS,_project)
        }
        catch(err:any) {
            setError(err)
        }
        finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id:number) => {
        try{
            setLoading(true);
            axiosInstance.delete(ApiRoutes.PROJECTS+`${id}`)
                .then(() => {
                    Notification({
                        message: 'Project Scrapped Successfully',
                        type: NotificationTypes.SUCCESS,
                        description: ''
                    })
                })
        }
        catch (err:any) {
            setError(err)
        }
        finally {
            setLoading(false)
        }
    }

    const editProject = async (id:number, data: Project) => {
        try{
            const _project = serialize(Project,data)
            setLoading(true);
            await axiosInstance.put(ApiRoutes.PROJECTS + `${id}`, _project)
                .then((res) => {
                    Notification({
                        message: 'Project updated Successfully',
                        type: NotificationTypes.SUCCESS,
                        description: ''
                    })
                    return deserialize(Project, res.data['project'])
                });
            
        }
        catch (err:any) {
            setError(err)
        }
        finally {
            setLoading(false)
        }
    }



  const createProjectDocument = async (data: Project) => {
    try {
      const _project = serialize(Project, data)
      const formData = convertJSONToFormData(_project);
      setLoading(true);
      return axiosInstance.post(ApiRoutes.PROJECT_DOCUMENTS, formData).then((response) => {
        return deserialize(ProjectDocuments, response.data['project_document'])
      })
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProjectDocument = async (documentId: string) => {
    try {
      setLoading(true);
      return axiosInstance.delete(ApiRoutes.PROJECT_DOCUMENTS + `/${documentId}`).then(() => documentId)
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const createProjectAttachment = async (data: Project) => {
    try {
      const _project = serialize(Project, data)
      const formData = convertJSONToFormData(_project);
      setLoading(true);
      return axiosInstance.post(ApiRoutes.PROJECT_ATTACHMENTS, formData).then((response) => {
        return deserialize(ProjectAttachment, response.data['project_attachment'])
      })
    } catch (err :any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProjectAttachment = async (attachmentId: string) => {
    try {
      setLoading(true);
      return axiosInstance.delete(ApiRoutes.PROJECT_ATTACHMENTS + `/${attachmentId}`)
    } catch (err:any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    return {projects,
        project,
        loading,
        fetchProjects,
        fetchProject,
    createProject,
deleteProject,
     editProject,
    createProjectDocument,
deleteProjectDocument,
deleteProjectAttachment,
createProjectAttachment}
}

export default ProjectService;