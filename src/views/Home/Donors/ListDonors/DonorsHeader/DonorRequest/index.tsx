import React, { FC } from 'react'
import "./donorRequest.scss"
import {Col, Divider, Modal, Row} from "antd";
import userPlaceholder from "../../../../../../assets/userPlaceholder.png";

interface DonorRequestProps {
    showModal:boolean;
    setShowModal:Function;
    title:string;
    info:string;
    icon:string;
}

const DonorRequest: FC<DonorRequestProps> = (props) => {
    const { showModal, setShowModal, title, info, icon } = props;

    return (
        <div className="donor-request">
            <Modal title={
                <div>
                    <div className="modal-title">
                        <h2>
                            <i className={`icon-${icon}`}/> <span className={"ml-2"}>{title}</span>
                        </h2>
                        <i className="icon-close" onClick={()=>setShowModal(false)} />
                    </div>
                    <div className="sub-title">
                        {info}
                    </div>
                </div>
            }
                   visible={showModal}
                   onCancel={()=>setShowModal(false)}
                   className="create-project-modal donor-request-modal"
            >
                <div className={"donor-request-card"}>
                    <div className={"donor-request-card__requester-info"}>
                        <div className={"requester-image"}>
                            <img src={userPlaceholder} alt={''}/>
                        </div>
                        <div className={"requester-details"}>
                            <h2 className={"font-semi-bold requester-name"}>
                                Nakahara Chuuya
                            </h2>
                            <div className={"requester-contact"}>
                                <Row>
                                    <Col span={12}>
                                        <i className={"icon-phone"}/> +91 9987723471
                                    </Col>
                                    <Col span={11}>
                                        <i className={"icon-reg-no-info"}/> APAK77134
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <Divider className={"donor-request-card__divider"}/>
                    <div className={"donor-request-card__requester-info"}>
                        <div className={"sub-title donor-request-card__label"}>Group head</div>
                        <div className={"head-image"}>
                            <img src={userPlaceholder} alt={''}/>
                        </div>
                        <div className={"requester-details head-details"}>
                            <h2 className={"head-name font-semi-bold"}>
                                Dazai osamu
                            </h2>
                            <div className={"requester-contact"}>
                                <Row>
                                    <Col span={11}>
                                        <i className={"icon-phone"}/> +91 8875523477
                                    </Col>
                                    <Col span={11}>
                                        <i className={"icon-reg-no-info"}/> TEM8734PO
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className={"donor-request-card__actions"}>
                        <span className={"action-icon"}>
                            <i className={"icon-done"}/>
                        </span>
                        <span className={"action-icon"}>
                            <i className={"icon-close"}/>
                        </span>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DonorRequest;