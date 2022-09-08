import React, { FC, useEffect, useState } from 'react'
import "./projectBasicInfo.scss"
import { Form, Formik, FormikValues } from "formik";
import { Button, Col, Progress, Row } from "antd";
import CustomInput from "../../../../../shared/components/CustomInput";
import CustomCard from "../../../../../shared/components/CustomCard";
import ProjectService from "../../../../../services/ProjectService/ProjectService";
import { Project } from "../../../../../models/project.model";
import moment from "moment";
import PhoneNumberInput from '../../../../../shared/components/PhoneNumberInput';

interface ProjectBasicInfoProps {
    projectId: number;
    project?: Project;
    refreshProject: Function;
}

const ProjectBasicInfo: FC<ProjectBasicInfoProps> = ({ projectId, project, refreshProject }) => {

    const { loading, editProject } = ProjectService();

    const [projectDetailsEditable, setProjectDetailsEditable] = useState(false);
    const [initialValues, setInitialValues] = useState<Project>(
        {
            registrationNumber: "",
            startDate: "",
            endDate: "",
            estimatedAmount: undefined,
            expensedAmount: undefined,
            inchargeName: "",
            templeInchargeNameTamil: "",
            inchargeMobileNumber: "",
        }
    )

    useEffect(() => {
        refreshProject();
        console.log("sd")
    }, [projectId])

    const dateFormatter = (date?: string) =>
        date ? moment(date).format('DD/MM/YYYY') : undefined

    useEffect(() => {
        setInitialValues({
            registrationNumber: project?.registrationNumber,
            startDate: dateFormatter(project?.startDate),
            endDate: dateFormatter(project?.endDate),
            estimatedAmount: project?.estimatedAmount,
            expensedAmount: project?.expensedAmount,
            inchargeName: project?.inchargeName,
            templeInchargeNameTamil: project?.templeInchargeNameTamil,
            inchargeMobileNumber: project?.inchargeMobileNumber,
        })
    }, [project])

    const handleCancel = (setFieldValue: Function) => {
        setProjectDetailsEditable(!projectDetailsEditable)
        setFieldValue("startDate", dateFormatter(project?.startDate))
        setFieldValue("endDate", dateFormatter(project?.endDate))
        setFieldValue("estimatedAmount", project?.estimatedAmount)
        setFieldValue("expensedAmount", project?.expensedAmount)
        setFieldValue("inchargeName", project?.inchargeName)
        setFieldValue("templeInchargeNameTamil", project?.templeInchargeNameTamil)
        setFieldValue("inchargeMobileNumber", project?.inchargeMobileNumber)
    }

    return (
        <div className="project-basic-info">
            <CustomCard>
                <div className="details">
                    <div className="details-form">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values: FormikValues) => {
                                editProject(projectId, values).then((val:any) => refreshProject())
                                setProjectDetailsEditable(!projectDetailsEditable)
                            }}
                            enableReinitialize >
                            {({ values, setFieldValue }) =>
                                <Form>
                                    <div className="title">
                                        <h3 className="mr-5 mb-0">Project Details</h3>
                                        {projectDetailsEditable ?
                                            <div className="edit-controls">
                                                <Button htmlType="submit">
                                                    <i className="icon-done" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleCancel(setFieldValue)}>
                                                    <i className="icon-close" />
                                                </Button>
                                            </div>
                                            :
                                            <span>
                                                <i className="icon-edit"
                                                    onClick={() => setProjectDetailsEditable(!projectDetailsEditable)}
                                                />
                                            </span>
                                        }
                                    </div>
                                    <Row className="labels">
                                        <Col span={7}>
                                            Registration Number
                                        </Col>
                                        <Col span={7} offset={1}>
                                            Planned Start Date
                                        </Col>
                                        <Col span={7} offset={1}>
                                            Planned End Date
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field"}
                                                placeholder=""
                                                name="regNumber"
                                                type="text"
                                                disabled={true}
                                            />
                                        </Col>
                                       
                                    </Row>
                                    <Row className="labels">
                                        <Col span={8}>
                                            Estimate Amount
                                        </Col>
                                        <Col span={8}>
                                            Expensed Amount
                                        </Col>
                                    </Row>
                                    <Row className="inputs">
                                        <Col span={7}>
                                            <CustomInput
                                                className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                                placeholder="-"
                                                name="estimatedAmount"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            <CustomInput
                                                className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                                placeholder="-"
                                                name="expensedAmount"
                                                type="text"
                                            // disabled={false}
                                            />
                                        </Col>
                                        {project?.status !== 'proposed' &&
                                            <Col span={9}>
                                                <div className="project-basic-info__progress">
                                                    <span className="title">{project?.completion || 0}% Completion
                                                        <span>last update on {moment().format('DD MMM,YYYY')}</span>
                                                    </span>
                                                    <Progress percent={project?.completion || 0} size="small" />
                                                </div>
                                            </Col>}
                                    </Row>
                                    <Row className="labels">
                                        <Col span={7} className="mt-6">
                                            Temple Incharge
                                        </Col>
                                        <Col span={7} >
                                            <CustomInput
                                                className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                                placeholder="-"
                                                name="inchargeName"
                                                type="text"
                                                prefix={<i className="icon-profile" style={{ color: "grey" }} />}
                                            />
                                            <CustomInput
                                                className={"input-field tamil-incharge-name " + (projectDetailsEditable ? "editable" : null)}
                                                placeholder="-"
                                                name="templeInchargeNameTamil"
                                                type="text"
                                            />
                                        </Col>
                                        <Col span={7} offset={1}>
                                            {/* <CustomInput
                                                className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                                placeholder="-"
                                                name="inchargeMobileNumber"
                                                type="text"
                                                prefix={<i className="icon-phone" style={{ color: "grey" }} />}
                                            /> */}
                                            <PhoneNumberInput
                                                prefix={<i className="icon-phone" style={{ color: "grey" }} />}
                                                name={'inchargeMobileNumber'}
                                                disabled={!projectDetailsEditable}
                                                value={values.inchargeMobileNumber}
                                                onChange={(value:any) => setFieldValue("inchargeMobileNumber", value)}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            }
                        </Formik>
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}

export default ProjectBasicInfo;