import React, {FC, useEffect, useState} from 'react'
import "./projectHeader.scss"
import {Form, Formik, FormikValues} from "formik";
import CustomInput from "../../../../../shared/components/CustomInput";
import {Button, Popover} from "antd";
import ProjectService from "../../../../../services/ProjectService/ProjectService";
import {Project} from "../../../../../models/project.model";
import ProjectScrapDeleteModal from "./ProjectScrapDeleteModal";

interface ProjectHeaderProps{
    projectId?: number;
    refreshProject:Function;
    project?: Project;
}

const ProjectHeader: FC<ProjectHeaderProps> = (
    {
        projectId,
        refreshProject,
        project
    }
) => {


    const { deleteProject, editProject } = ProjectService();

    const [titleEditable, setTitleEditable] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<Project>({
        name: "",
        templeNameTamil: ""
    });


    useEffect(()=>{
        if(projectId)
            refreshProject();
    },[projectId])

    useEffect(()=>{
        if(project)
            setInitialValues({
                name: project.name,
                templeNameTamil: project.templeNameTamil
            })
    },[project])

    const handleCancel = (setFieldValue: Function) => {
        setTitleEditable(!titleEditable);
        setFieldValue("name",project?.name)
        setFieldValue("templeNameTamil",project?.templeNameTamil)
    }

    const handleSave = () => {
        if(projectId && project) editProject(Number(projectId),project).then(()=>{
            refreshProject().then()
        })
    }

    return (
        <div className="project-header">

            <ProjectScrapDeleteModal showModal={showDeleteModal}
                                     setShowModal={setShowDeleteModal}
                                     refreshProject={refreshProject}
                                     project={project}
            />

            <div className="title">
                <Formik initialValues={initialValues}
                    onSubmit={(values: FormikValues) => {
                        if(projectId) editProject(projectId, values).then(()=>refreshProject(projectId))
                        setTitleEditable(!titleEditable)
                    }}
                    enableReinitialize
                >
                    {({ values, setFieldValue }) =>
                        <Form>
                            <div className="project-name__fields">
                                <div className="project-name__field__inputs">
                                    <CustomInput type="text"
                                                name="name"
                                                placeholder=""
                                                className={"input-field " + (titleEditable ? "editable" : null)}
                                    />
                                    <CustomInput type="text"
                                                name="templeNameTamil"
                                                placeholder=""
                                                className={"input-field " + (titleEditable ? "editable" : null)}
                                    />
                                </div>
                                {!titleEditable &&
                                <i className="icon-edit" onClick={() => setTitleEditable(!titleEditable)}/>}
                            </div>

                            {titleEditable &&
                                <div className="edit-controls">
                                    <Button htmlType="submit">
                                        <i className="icon-done"/>
                                    </Button>
                                    <Button onClick={()=>handleCancel(setFieldValue)}>
                                        <i className="icon-close"/>
                                    </Button>
                                </div>
                            }
                        </Form>
                    }
                </Formik>
            </div>
            <div className="controls">
                <Popover placement="bottomRight"
                         content={
                                 <div className="popover-content project-controls-popover" onClick={() => {
                                     setShowDeleteModal(true)
                                 }}>
                                     <i className={`${project?.status !== 'scrapped' ?
                                         'icon-delete' : 'icon-delete-forever'}`}/>
                                     {project?.status !== 'scrapped' ? 'Scrap ' : 'Delete '}project
                                 </div>
                         }
                         trigger="click"
                >
                    <Button>
                        <i className="icon-more"/>
                    </Button>
                </Popover>
                {/*<Button type="primary" onClick={handleSave}>{"Save & Publish"}</Button>*/}
            </div>
        </div>
    )
}

export default ProjectHeader;