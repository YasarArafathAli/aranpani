import React, {FC, useEffect, useRef, useState} from 'react'
import "./projectDocuments.scss"
import {Form, Formik, FormikProps} from "formik";
import {Col, Row} from "antd";
import DocumentUpload from "../../../../../shared/components/DocumentUpload";
import CustomCard from "../../../../../shared/components/CustomCard";
import {Project} from "../../../../../models/project.model";
import ProjectService from "../../../../../services/ProjectService/ProjectService";

interface ProjectDocumentsProps {
    project?:Project;
}

const ProjectDocuments: FC<ProjectDocumentsProps> = (props) => {
    const { project } = props;

    const { createProjectDocument, deleteProjectDocument } = ProjectService();

    const [initialValues,setInitialValues] = useState({
        documents: [{
            id: "",
            documentUrl: ""
        }]
    })

    type FormValues = typeof initialValues;
    const formRef = useRef<FormikProps<FormValues>>(null);

    const handleUploadDoc = async(file: File) => {
        const data = {
            document: file,
            projectId: project?.id
        }

        const { documents }: any = formRef?.current?.values;
        documents[documents.length - 1] = true;
        formRef?.current?.setFieldValue("documents", documents);
        await createProjectDocument(data).then((response:any)=>{
            documents[documents.length - 1] = response;
            formRef?.current?.setFieldValue("documents", [...documents, undefined]);
        })
    };

    useEffect(()=>{
        if(project?.projectDocuments?.length)
            setInitialValues({
                documents: [...project?.projectDocuments,{
                    id: "",
                    documentUrl: ""
                }]
            })
    },[project])

    return (
        <div className="project-documents">
            <CustomCard>
                <div className="status">
                    {/*<i className="icon-add float-right" style={{ color: "blue" }} />*/}
                    <h3 className="title">Documents</h3>
                    <div className="sub-title">Add documents related to project</div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={() => { }}
                        enableReinitialize
                        innerRef={formRef}
                    >
                        {({ values, setFieldValue }) => {
                            return (
                                <Form>
                                    <Row>
                                        {values.documents?.map((value) => (
                                            <Col className="mb-2 mt-2" span={24}>
                                                <DocumentUpload
                                                    placeholderText="Upload Document here"
                                                    value={value?.documentUrl}
                                                    onUpload={handleUploadDoc}
                                                    onDelete={() => {
                                                        deleteProjectDocument(value?.id).then((deletedDocumentId:any)=>
                                                            {
                                                                setFieldValue("documents",
                                                                    values.documents.filter((document) =>
                                                                        document?.id !== deletedDocumentId
                                                                    )
                                                                )
                                                            }
                                                        )
                                                    }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </CustomCard>
        </div>
    )
}

export default ProjectDocuments;