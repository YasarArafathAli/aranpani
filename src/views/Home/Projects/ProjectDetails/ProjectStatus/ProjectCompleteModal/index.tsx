import React, { FC } from 'react'
import "./projectCompleteModal.scss"
import {Button, Col, Modal, Row} from "antd";
import ProjectService from "../../../../../../services/ProjectService/ProjectService";
import {Project} from "../../../../../../models/project.model";

interface ProjectCompleteModalProps {
    showModal:boolean;
    setShowModal: Function;
    project?: Project;
    refreshProject?: Function;
}

const ProjectCompleteModal: FC<ProjectCompleteModalProps> = (
    {
        showModal, setShowModal, project, refreshProject
    }
) => {

    const { editProject, loading } = ProjectService();

    const handleSubmit = () => {
        if(project?.id) editProject(Number(project?.id),{status: "completed"}).then(()=>{
            if(refreshProject) refreshProject().then()
            setShowModal(false)
        })
    }

    return (
        <div className="project-complete-modal">
            <Modal title={
                <div className="modal-title">
                    <div>
                        <h2>Complete Project</h2>
                        <div className="sub-title">
                            Once page is moved to completed, you cannot edit anything.<br/>
                            Please ensure data is fully correct
                        </div>
                    </div>
                    <div className="modal-controls">
                        <i className="icon-close" onClick={()=>setShowModal(false)} />
                    </div>
                </div>
            }
                   visible={showModal}
                   onCancel={()=>setShowModal(false)}
                   className="project-complete-modal__body"
            >
                <div className="project-complete-modal__details">
                    <div className="project-complete-modal__name">{project?.name}</div>
                    <div className="project-complete-modal__location">{project?.location}</div>
                </div>
                <Button type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                >
                    Confirm
                </Button>
            </Modal>
        </div>
    )
}

export default ProjectCompleteModal;