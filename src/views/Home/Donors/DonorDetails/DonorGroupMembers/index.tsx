import React, { FC, useState, useEffect } from 'react'
import "./donorGroupMembers.scss"
import CustomCard from "../../../../../shared/components/CustomCard";
import userPlaceholder from "../../../../../assets/userPlaceholder.png";
import { Button, Col, Dropdown, Menu, Modal, Row } from "antd";
import { contactDetailsValidation } from "../../../ContactDetails/contactDetailsValidation";
import { Form, Formik } from "formik";
import CustomInput from "../../../../../shared/components/CustomInput";
import { createGroupMemberValidation } from "./createGroupMemberValidation";
import DonorGroupService from "../../../../../services/DonorService/donorGroup.service";
import { GroupDonorContributor } from "../../../../../models/donors.model";
import PhoneNumberInput from '../../../../../shared/components/PhoneNumberInput';
import { parsePhoneNumber } from 'react-phone-number-input';

interface DonorGroupMembersProps {
    donor?: any;
    refreshDonor: () => void
}

const DonorGroupMembers: FC<DonorGroupMembersProps> = ({ donor, refreshDonor }) => {

    const { fetchDonorGroupMembers, donorGroupList, createDonorGroupMember, donorButtonLoading,
        updateDonorGroupMember, deleteDonorGroupMember, fetchDonorGroupMemberWithMobileNumber,
        promoteAsFamilyHead, promoteAsIndividualDonor,
    } = DonorGroupService();

    const [currentMember, setCurrentMember] = useState<GroupDonorContributor>();
    const [promoteToIndividualDonorVisible, setPromoteToIndividualDonorVisible] = useState<boolean>(false)
    const [selectedMemberId, setSelectedMemberId] = useState<string>()
    const [initialValues, setInitialValues] = useState<GroupDonorContributor>({
        username: "",
        mobileNumber: "",
        isdCode: "",
    })

    useEffect(() => {
        if (donor?.id) fetchDonorGroupMembers(donor.id).then()
    }, [donor])

    useEffect(() => {
        setInitialValues({
            username: currentMember?.username,
            mobileNumber: currentMember?.mobileNumber,
        })
    }, [currentMember])

    const deleteDonorGroupMemberHanlder = (id: number) => {
        deleteDonorGroupMember(donor?.id, id).then(() => refreshDonor())
    }

    const handleSubmit = (formValues: GroupDonorContributor, { resetForm }: any) => {
        const values = { ...formValues }
        if (values.mobileNumber) {
            const mobile = values.mobileNumber
            values.mobileNumber = parsePhoneNumber(mobile || '')?.nationalNumber as string
            values.isdCode = "+" + parsePhoneNumber(mobile || '')?.countryCallingCode as string
        }
        currentMember?.id ?
            updateDonorGroupMember(donor?.id, currentMember?.id, values).then((data:any) => {
                if (data) {
                    setInitialValues({})
                    fetchDonorGroupMembers(donor?.id).then();
                }
            }) :
            createDonorGroupMember(donor?.id, values).then((data:any) => {
                if (data) {
                    setInitialValues({})
                    fetchDonorGroupMembers(donor?.id).then();
                }
            })
    };
    let counter: NodeJS.Timeout
    const groupMemberMobileChangeHandler = (mobileNumber: string) => {
        if (counter)
            clearTimeout(counter)
        counter = setTimeout(async () => {
            const donorsWithSameMobile = await fetchDonorGroupMemberWithMobileNumber({
                mobile_number: parsePhoneNumber(mobileNumber || '')?.nationalNumber as string,
                isd_code: "+" + parsePhoneNumber(mobileNumber || '')?.countryCallingCode as string
            });
            const donorWithSameIsd = donorsWithSameMobile?.find((donor:any) => donor.isdCode === ("+" + parsePhoneNumber(mobileNumber || '')?.countryCallingCode))
            setInitialValues((prev: any) => ({
                ...prev,
                mobileNumber,
                id: donorWithSameIsd?.id,
                username: donorWithSameIsd?.username || undefined
            }))
        }, 800);
    }

    const promoteToHeadOfFamilyHandler = async (memberId?: string) => {
        if (!memberId) return
        await promoteAsFamilyHead(donor.id, memberId)
            && refreshDonor()
    }

    const promoteMemberAsIndividualDonor = async () => {
        if (!selectedMemberId) return
        const response = await promoteAsIndividualDonor(donor.id, selectedMemberId)
        if (response) {
            refreshDonor()
            closeIndividualDonorModal()
        }
    }

    const openIndividualDonorModal = (memberId?: string) => {
        if (!memberId) return
        setPromoteToIndividualDonorVisible(true)
        setSelectedMemberId(memberId)
    }
    const closeIndividualDonorModal = () => {
        setPromoteToIndividualDonorVisible(false)
        setSelectedMemberId(undefined)
    }



    const confirmationModal = (
        <Modal title={
            <div className="modal-title">
                <div>
                    <h2>Promote to individual donor</h2>
                    <div className="sub-title">
                        Are you sure to promote group member to individual donor?
                    </div>
                </div>
                <div className="modal-controls">
                    <i className="icon-close" onClick={closeIndividualDonorModal} />
                </div>
            </div>
        }
            visible={promoteToIndividualDonorVisible}
            onCancel={closeIndividualDonorModal}
            className="project-complete-modal__body"
            centered
        >
            <Row gutter={36}>
                <Col span={12}>
                    <Button type="default"
                        onClick={closeIndividualDonorModal}
                        className={"donor-subscription-change-modal__action"}
                    >
                        Cancel
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary"
                        loading={donorButtonLoading}
                        onClick={promoteMemberAsIndividualDonor}
                        className={"donor-subscription-change-modal__action"}
                    >
                        Promote
                    </Button>
                </Col>
            </Row>
        </Modal>
    )

    const menu = (memberId?: string) => <Menu>
        {currentMember?.regNumber && <Menu.Item key="1" onClick={() => openIndividualDonorModal(memberId)}>
            <span className="change-rep-menu-item">
                <i className={"icon-donor"} /> Promote to individual donor
            </span>
        </Menu.Item>}
        <Menu.Item key="2" onClick={() => promoteToHeadOfFamilyHandler(memberId)}>
            <span className="change-rep-menu-item">
                <i className={"icon-promote-to-ind-donor"} /> Promote to head of this family
            </span>
            <div className={"sub-title menu-item-info"}>
                <i className={"icon-info"} /> This group member will further donate on behalf of the donor and other members
            </div>
        </Menu.Item>
        {!currentMember?.regNumber && currentMember?.id && <Menu.Item key="3" onClick={() => {
            currentMember?.id && deleteDonorGroupMemberHanlder(currentMember.id)
        }}>
            <span className="change-rep-menu-item">
                <i className={"icon-delete"} /> Delete group member
            </span>
        </Menu.Item>}
    </Menu>


    const createDropdown = (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createGroupMemberValidation}
            enableReinitialize
        >
            {({ isValid, setFieldValue, values }) => {
                return (
                    <Form className="create-project-form create-internal-user create-group-member-form">
                        <div className="form-field">
                            <PhoneNumberInput
                                title='Phone Number'
                                name={'mobileNumber'}
                                value={values.mobileNumber}
                                onChange={(value:any) => {
                                    setFieldValue("mobileNumber", value)
                                    if (value?.length)
                                        groupMemberMobileChangeHandler(value)
                                }}
                            />
                        </div>
                        <div className="form-field">
                            <CustomInput type="text"
                                name="username"
                                placeholder="Type name"
                                prefix={<i className={'icon-profile-placeholder'} />}
                            />
                        </div>
                        <div className="form-field">
                            <Button type="primary"
                                htmlType="submit"
                                loading={donorButtonLoading}
                                disabled={!isValid}
                            >
                                {currentMember?.id ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )

    return (
        <div className="donor-group-members">
            <CustomCard>
                <h3 className="title">{donorGroupList?.length} Group member</h3>
                <div className="sub-title">
                    Group members under this donor
                </div>
                {donorGroupList?.map(groupMember =>
                    <div className="donor-group-member">
                        <div className="donor-group-member__image">
                            <img src={userPlaceholder} alt={''} />
                        </div>
                        <div className="donor-group-member__info">
                            <div className="donor-group-member__name font-semi-bold">
                                {groupMember.username}
                            </div>
                            <Row>
                                <Col span={11} className={"donor-group-member__value"}>
                                    <i className={"icon-phone"} />
                                    {groupMember.mobileNumber ? groupMember.isdCode + " " + groupMember.mobileNumber : 'NA'}
                                </Col>
                                <Col span={11} className={"donor-group-member__value"}>
                                    <i className={"icon-info"} /> {groupMember.regNumber ?? 'NA'}
                                </Col>
                            </Row>
                        </div>
                        {!groupMember.mobileNumber && <Dropdown overlay={createDropdown}
                            placement="bottomLeft"
                            trigger={['click']}
                            className='rep-donors-list__action'
                            onVisibleChange={(visible) =>
                                setCurrentMember(visible ? groupMember : {})
                            }
                        >
                            <i className={"icon-edit donor-group-member__menu edit-menu"} />
                        </Dropdown>}
                        <Dropdown overlay={menu(groupMember?.id?.toString())}
                            placement="bottomLeft"
                            trigger={['click']}
                            className='rep-donors-list__action'
                            onVisibleChange={(visible) =>
                                setCurrentMember(visible ? groupMember : {})
                            }
                        >
                            <i className="icon-more donor-group-member__menu" />
                        </Dropdown>
                    </div>
                )}
                <Dropdown overlay={createDropdown}
                    placement="bottomLeft"
                    trigger={['click']}
                    className='rep-donors-list__action'
                >
                    <div className="donor-group-members__add">+</div>
                </Dropdown>
            </CustomCard>
            {confirmationModal}
        </div>
    )
}

export default DonorGroupMembers;