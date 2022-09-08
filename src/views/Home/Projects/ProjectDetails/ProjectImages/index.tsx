import React, { FC, useEffect, useRef, useState } from 'react'
import "./projectImages.scss"
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { Col, Row } from "antd";
import ImageUpload from "../../../../../shared/components/ImageUpload";
import CustomCard from "../../../../../shared/components/CustomCard";
import ProjectService from '../../../../../services/ProjectService/ProjectService';
import { Project } from "../../../../../models/project.model";

interface ProjectImagesProps {
    project?: Project;
    initialValues?: any;
    formRef?: any;
}

const ProjectImages: FC<ProjectImagesProps> = ({ project }) => {

    const { createProjectAttachment, deleteProjectAttachment } = ProjectService();

    const [initialValues, setInitialValues] = useState({
        mainImage: {
            id: "",
            imageUrl: ""
        },
        images: [{
            id: "",
            imageUrl: ""
        }]
    })

    type FormValues = typeof initialValues;
    const formRef = useRef<FormikProps<FormValues>>(null);

    const handleUpload = async (file: File, type?: boolean) => {
        const data = {
            image: file,
            projectId: project?.id
        }
        //main image
        if (type) {
            formRef?.current?.setFieldValue("mainImage", true);
            await createProjectAttachment(data).then((response) => {
                formRef?.current?.setFieldValue("mainImage", response);
            })
            return;
        }

        //other images
        const { images }: any = formRef?.current?.values;
        images[images.length - 1] = true;
        formRef?.current?.setFieldValue("images", images);
        await createProjectAttachment(data).then((response) => {
            images[images.length - 1] = response;
            formRef?.current?.setFieldValue("images", images.length < 8 ? [...images, undefined] : images);
        })
    };

    const handleDelete = async (imageId: string, type?: boolean) => {
        if (type) {
            return deleteProjectAttachment(imageId).then(() => {
                formRef?.current?.setFieldValue("mainImage", {
                    id: "",
                    image_url: ""
                });
            })
        }

        return deleteProjectAttachment(imageId).then(() => imageId)
    }

    useEffect(() => {
        if (project?.projectAttachments?.length)
            setInitialValues({
                mainImage: {
                    id: project?.projectAttachments[0].id,
                    imageUrl: project?.projectAttachments[0].imageUrl
                },
                images: project?.projectAttachments?.length < 9 ? [...project?.projectAttachments?.slice(1, 8), {
                    id: "",
                    imageUrl: ""
                }] : [...project?.projectAttachments?.slice(1, 9)]
            })
    }, [project])

    return (
        <div className="project-images">
            <CustomCard>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: FormikValues) => {
                    }}
                    enableReinitialize
                    innerRef={formRef}
                >
                    {({ values, setFieldValue }) =>
                        <Form>
                            <Row>
                                <Col span={8}>
                                    <ImageUpload
                                        placeholderText="Main Image"
                                        large
                                        value={values?.mainImage?.imageUrl}
                                        onUpload={(file:any) => handleUpload(file, true)}
                                        onDelete={() => handleDelete(values?.mainImage?.id, true)}
                                    />
                                </Col>
                                <Col span={16}>
                                    <Row gutter={[0, 10]}>
                                        {values.images?.map((value: { id: string, imageUrl: string }) => (
                                            <Col span={6} key={value.id}>
                                                <ImageUpload
                                                    value={value?.imageUrl}
                                                    onUpload={handleUpload}
                                                    onDelete={() => {
                                                        handleDelete(value?.id).then((deletedImageId) => {
                                                            setFieldValue("images",
                                                                values.images.filter(o => o).length === 8 ?
                                                                    [...values.images.filter((image: { id: string, imageUrl: string }) =>
                                                                        image?.id !== deletedImageId
                                                                    ), undefined
                                                                    ] : values.images.filter((image: { id: string, imageUrl: string }) =>
                                                                        image?.id !== deletedImageId
                                                                    )
                                                            )
                                                        })
                                                    }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    }
                </Formik>
            </CustomCard>
        </div>
    )
}

export default ProjectImages;