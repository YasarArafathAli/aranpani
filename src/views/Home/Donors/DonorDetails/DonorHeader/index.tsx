import React, { FC, useEffect, useState } from 'react'
import "./donorHeader.scss"
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import CustomInput from "../../../../../shared/components/CustomInput";
import { Button, Dropdown, Popover } from "antd";
import userPlaceholder from "../../../../../assets/userPlaceholder.png";
import { DonorModel } from '../../../../../models/donors.model';
import DonorService from '../../../../../services/DonorService/DonorService';
import DeleteConfirmation from '../../../../../shared/components/DeleteConfirmation';

interface DonorHeaderProps {
    donor?: DonorModel;
    refreshDonor: Function;
    updateHandler: (donor: DonorModel, cb: () => void) => void
}

const DonorHeader: FC<DonorHeaderProps> = (props) => {
    const { donor, refreshDonor, updateHandler } = props;

    const [titleEditable, setTitleEditable] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<DonorModel>(new DonorModel())

    const {
        donorSubmitting,
        deactivateDonor,
        updateDonor,
    } = DonorService()

    useEffect(() => {
        if (donor)
            setInitialValues({ ...donor })
    }, [donor])

    const handleCancel = (setFieldValue: Function) => {
        setTitleEditable(!titleEditable);
        setFieldValue("username", donor?.username)
    }

    const submitHandler = (values: DonorModel, helpers: FormikHelpers<DonorModel>) => {
        updateHandler(values, () => {
            helpers.resetForm()
            setTitleEditable(false)
        })
    }

    const deactivateDonorHandler = async () => {
        if (!donor?.id) return
        await deactivateDonor(donor?.id.toString())
        refreshDonor()
    }

    const reactivateDonorHandler = async () => {
        if (!donor?.id) return
        await updateDonor({ ...donor, status: 1 })
        refreshDonor()
    }

    return (
        <div className="donor-header project-header">
            <div className="title">
                <Formik initialValues={initialValues}
                    onSubmit={submitHandler}
                    enableReinitialize
                >
                    {({ values, setFieldValue }) =>
                        <Form>
                            <div className="project-name__fields">
                                <div className="project-name__field__inputs donor-name-field">
                                    <img src={donor?.profilePicUrl || userPlaceholder}
                                        alt={''}
                                        className="donor-details__profile-pic"
                                    />
                                    <CustomInput type="text"
                                        name="username"
                                        placeholder=""
                                        className={"input-field " + (titleEditable ? "editable" : null)}
                                    />
                                </div>
                                {!titleEditable &&
                                    <i className="icon-edit" onClick={() => setTitleEditable(!titleEditable)} />}
                            </div>

                            {titleEditable &&
                                <div className="edit-controls">
                                    <Button htmlType="submit">
                                        <i className="icon-done" />
                                    </Button>
                                    <Button onClick={() => handleCancel(setFieldValue)}>
                                        <i className="icon-close" />
                                    </Button>
                                </div>
                            }
                        </Form>
                    }
                </Formik>
            </div>
            <div className="controls">
                {donor?.status ? <Dropdown placement="bottomRight"
                    overlay={
                        <div className="popover-content project-controls-popover" onClick={() => setShowDeleteModal(true)}>
                            <i className={'icon-delete'} />
                            Deactivate
                        </div>
                    }
                    trigger={["click"]}
                >
                    <Button>
                        <i className="icon-more" />
                    </Button>
                </Dropdown>
                    : <Button type="default" onClick={reactivateDonorHandler}>{"Reactivate"}</Button>}
            </div>
            <DeleteConfirmation
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                fullTitle={'Deactivate Donor'}
                info={'Are you sure to deactivate the donor? the user will be removed access to the platform'}
                name={donor?.username}
                email={donor?.email}
                mobileNumber={donor?.mobileNumber}
                loading={donorSubmitting}
                handleDelete={deactivateDonorHandler} />
        </div>
    )
}

export default DonorHeader;