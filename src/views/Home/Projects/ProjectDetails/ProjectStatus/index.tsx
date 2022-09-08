import React, {FC, useEffect, useState} from 'react'
import "./projectStatus.scss"
import {Button, Select} from "antd";
import CustomCard from "../../../../../shared/components/CustomCard";
import {Project} from "../../../../../models/project.model";
import ProjectService from "../../../../../services/ProjectService/ProjectService";
import ProjectUpdateModal from "./ProjectUpdateModal";
import ProjectCompleteModal from "./ProjectCompleteModal";

const { Option } = Select;

interface ProjectStatusProps {
    project?: Project;
    refreshProject?:Function;
}

const options: any = {
    proposed: 'planned',
    planned: 'active',
    active: 'completed',
    scrapped: 'proposed'
}


const ProjectStatus: FC<ProjectStatusProps> = ({project, refreshProject}) => {

    const { editProject } = ProjectService();

    const [status, setStatus] = useState<string>('');
    const [enableSave, setEnableSave] = useState<boolean>(false);
    const [showPlanModal, setShowPlanModal] = useState<boolean>(false);
    const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);

    useEffect(()=>{
       if(project?.status) setStatus(project?.status)
    },[project])

    useEffect(()=>{
       if(!showPlanModal && !showCompleteModal && project?.status) setStatus(project?.status)
    },[showPlanModal, showCompleteModal])

    const handleSubmit = () => {
        if(project?.id) editProject(Number(project.id), { status }).then(()=>{
            refreshProject && refreshProject();
            setEnableSave(false)
        })
    }

    return (
        <div className="project-status">
            <ProjectUpdateModal showModal={showPlanModal}
                                setShowModal={setShowPlanModal}
                                projectId={Number(project?.id)}
                                refreshProject={refreshProject}
            />

            <ProjectCompleteModal showModal={showCompleteModal}
                                  setShowModal={setShowCompleteModal}
                                  project={project}
                                  refreshProject={refreshProject}
            />

            <CustomCard>
                <div className="status">
                    {enableSave && <div className="edit-controls project-status-edit">
                        <Button onClick={handleSubmit}>
                            <i className="icon-done"/>
                        </Button>
                        <Button onClick={()=>{
                            setEnableSave(false)
                            if(project?.status) setStatus(project?.status)
                        }}>
                            <i className="icon-close"/>
                        </Button>
                    </div>}
                    <h3 className="title">Status</h3>
                    <div className="sub-title">Configure the status of the project</div>
                    <Select
                        value={status}
                        className={`status-select mr-3 mt-5 text-capitalize ${status}`}
                        style={{ width: "100%" }}
                        suffixIcon={<i className="icon-down" />}
                        onChange={(value) => {
                            setStatus(value)
                            if(value!=='planned' && value!=='completed') setEnableSave(true)
                            if(value==='planned') setShowPlanModal(true)
                            if(value==='completed') setShowCompleteModal(true)
                        }}
                        disabled={project?.status === 'completed'}
                    >
                        <Option disabled value="null">
                            Change Project Status
                        </Option>
                        <Option value={project?.status ? options[project?.status] : "planned"}
                                style={{ height: "75px", borderRadius: "20px" }}
                        >
                            <div className={`ops text-capitalize ${project?.status ? options[project?.status] : "planned"}`}>
                                {project?.status ? options[project?.status] : "planned"}
                            </div>
                        </Option>
                    </Select>
                    {project?.status === 'scrapped' &&
                    <div className="scrap-reason">
                        <h3 className={"title"}>Reason</h3>
                        <div>{project?.reason ?? "Not available"}</div>
                    </div>}
                </div>
            </CustomCard>
        </div>
    )
}

export default ProjectStatus;