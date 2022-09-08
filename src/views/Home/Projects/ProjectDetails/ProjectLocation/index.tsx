import React, { FC, useEffect, useState } from 'react'
import "./projectLocation.scss"
import { Form, Formik, FormikValues } from "formik";
import { Button } from "antd";
import CustomInput from "../../../../../shared/components/CustomInput";
import CustomCard from "../../../../../shared/components/CustomCard";
import ProjectService from "../../../../../services/ProjectService/ProjectService";
import { Project } from "../../../../../models/project.model";

interface ProjectLocationProps {
    project?: Project;
}

const ProjectLocation: FC<ProjectLocationProps> = ({ project }) => {
    const { loading, editProject } = ProjectService();

    const [locationEditable, setLocationEditable] = useState(false)
    const [initialValues, setInitialValues] = useState(
        {
            location: project?.location,
            locationTamilName: project?.locationTamilName,
            lat: project?.lat,
            long: project?.long,
        }
    )

    useEffect(() => {
        setInitialValues({
            location: project?.location,
            locationTamilName: project?.locationTamilName,
            lat: project?.lat,
            long: project?.long,
        })
    }, [project])

    let timeout: NodeJS.Timeout;
    return (
        <div className="project-location">
            <CustomCard>
                <div className="location">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values: FormikValues) => {
                            if (project?.id) editProject(Number(project?.id), values).then()
                            setLocationEditable(!locationEditable)
                        }}
                        enableReinitialize
                    >
                        {({ values }) =>
                            <Form>
                                {locationEditable ?
                                    <div className="edit-controls float-right">
                                        <Button htmlType="submit">
                                            <i className="icon-done" />
                                        </Button>
                                        <Button onClick={() => setLocationEditable(!locationEditable)}>
                                            <i className="icon-close" />
                                        </Button>
                                    </div>
                                    :
                                    <i className="icon-edit float-right"
                                        onClick={() => setLocationEditable(!locationEditable)}
                                    />
                                }
                                <CustomInput
                                    className={"input-field " + (locationEditable ? "editable" : null)}
                                    placeholder="-"
                                    name="location"
                                    type="text"
                                />
                                <CustomInput
                                    className={"input-field " + (locationEditable ? "editable" : null)}
                                    placeholder="-"
                                    name="locationTamilName"
                                    type="text"
                                />
                              
                            </Form>}
                    </Formik>
                </div>
            </CustomCard>
        </div>
    )
}

export default ProjectLocation;