import React, { FC } from 'react'
import { Button, Modal } from "antd";

interface DeleteConfirmationProps {
    showModal: boolean;
    setShowModal: Function;
    title?: string;
    fullTitle?: string;
    info: string;
    name?: string;
    email?: string;
    mobileNumber?: string;
    loading: boolean;
    handleDelete: () => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = (props) => {
    const { showModal, fullTitle, setShowModal, email, name, title, info, mobileNumber, handleDelete, loading } = props;

    return (
        <div className="delete-confirmation">
            <Modal title={
                <div className="modal-title">
                    <div>
                        <h2>
                            <i className='icon-delete' /> {
                                fullTitle || ('Delete ' + title)
                            }
                        </h2>
                        <div className="sub-title">
                            {info}
                        </div>
                    </div>
                    <div className="modal-controls">
                        <i className="icon-close" onClick={() => setShowModal(false)} />
                    </div>
                </div>
            }
                visible={showModal}
                onCancel={() => setShowModal(false)}
                className="project-complete-modal__body"
                centered
            >
                <div className="project-complete-modal__details">
                    <div className="project-complete-modal__name">{name}</div>
                    <div className="project-complete-modal__location">{email}</div>
                    <div className="project-complete-modal__location">{mobileNumber}</div>
                </div>
                <Button type="primary"
                    loading={loading}
                    onClick={handleDelete}
                    className={"project-scrap-delete-modal__action"}
                >
                    {fullTitle || ('Delete ' + title)}
                </Button>
            </Modal>
        </div>
    )
}

export default DeleteConfirmation;