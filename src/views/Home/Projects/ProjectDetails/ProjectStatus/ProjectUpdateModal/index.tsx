import React, { FC } from 'react'
import "./projectUpdateModal.scss"
import {Button, Col, Modal, Popover, Row} from "antd";
import {Form, Formik, FormikValues} from "formik";
import CustomInput from "../../../../../../shared/components/CustomInput";
import moment from "moment";
import {Project} from "../../../../../../models/project.model";
import ProjectService from "../../../../../../services/ProjectService/ProjectService";

interface ProjectUpdateModalProps {
    showModal:boolean;
    setShowModal: Function;
    projectId?: number;
    refreshProject?: Function;
}

const ProjectUpdateModal: FC<ProjectUpdateModalProps> = (
    {
        showModal, setShowModal, projectId, refreshProject
    }
) => {

    const { editProject, loading } = ProjectService();

    const initialValues:Project = {
        startDate: undefined,
        endDate: undefined,
        estimatedAmount: undefined,
        expensedAmount: undefined
    }

    return (
        <div className="project-update-modal">
            <Modal title={
                <div className="modal-title">
                    <h2>Update Project Details</h2>
                    <div className="modal-controls">
                        <i className="icon-close" onClick={()=>setShowModal(false)} />
                    </div>
                </div>
            }
                   visible={showModal}
                   onCancel={()=>setShowModal(false)}
                   className="project-update-modal__body"
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: FormikValues) => {
                        values.status="planned";
                        if(projectId) editProject(projectId, values).then(()=>{
                            if(refreshProject) refreshProject().then()
                            setShowModal(false)
                        })
                    }}
                    enableReinitialize
                >
                    {({values, setFieldValue}) =>
                        <Form>
                            <Row className="labels">
                                <Col span={11}>
                                    Planned start date
                                </Col>
                                <Col span={11} offset={2}>
                                    Planned end date
                                </Col>
                            </Row>
                          
                            <Row className="labels">
                                <Col span={8}>
                                    Estimated Amount
                                </Col>
                            </Row>
                            <Row className="inputs">
                                <Col span={24}>
                                    <CustomInput
                                        className="project-update-modal__input"
                                        placeholder="Enter estimated amount"
                                        name="estimatedAmt"
                                        type="text"
                                        prefix={"₹"}
                                    />
                                </Col>
                            </Row>
                            <Row className="labels">
                                <Button type="primary"
                                        loading={loading}
                                        htmlType={"submit"}
                                >
                                    Update project
                                </Button>
                            </Row>
                        </Form>
                    }
                </Formik>

            </Modal>
        </div>
    )
}

export default ProjectUpdateModal;