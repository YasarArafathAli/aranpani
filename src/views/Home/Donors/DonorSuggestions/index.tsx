import React, { FC } from 'react'
import "./donorSuggestions.scss"
import {Modal, Popover} from "antd";

interface DonorSuggestionsProps {
    showModal:boolean;
    setShowModal:Function;
}

const projectSuggestionsPopover = <div className="popover-content" style={{ cursor: "pointer" }}>
    <i className="icon-delete-forever"/>
    Remove all suggestions
</div>;
const projectSuggestionPopover = <div className="popover-content">
    <div className="">
        <i className="icon-add-2"/>
        Add suggestion
    </div>
    <div className="">
        <i className="icon-delete"/>
        Remove suggestion
    </div>
</div>;

const DonorSuggestions: FC<DonorSuggestionsProps> = ({showModal, setShowModal}) => {

    return (
        <div className="donor-suggestions">
            <Modal title={
                            <div className="modal-title">
                                <h2>Project Suggestions</h2>
                                <div className="modal-controls">
                                    <Popover placement="bottomRight"
                                             content={projectSuggestionsPopover}
                                             trigger="click">
                                        <i className="icon-more" />
                                    </Popover>
                                    <i className="icon-close" onClick={()=>setShowModal(false)} />
                                </div>
                            </div>
                        }
                   visible={showModal}
                   onCancel={()=>setShowModal(false)}
                   className="project-suggestions-modal">
                <div className="suggested-project">
                    <div className="suggested-project__details">
                        <div className="header">
                            <h2>
                                Arul Valla Naathar Temple
                            </h2>
                            <Popover placement="bottomRight" content={projectSuggestionPopover} trigger="click">
                                <i className="icon-more" />
                            </Popover>
                        </div>
                        <div className="info">
                            <h3>Thirumanacheri, Chennai</h3>
                            <h3> <i className="icon-profile"/> Sangaralingam</h3>
                            <h3>  <i className="icon-phone"/> +91 9023232342</h3>
                        </div>
                        <div className="images">
                            <img src="" alt="" /><img src="" alt="" /><img src="" alt="" />
                        </div>
                    </div>
                    <div className="suggested-project__person">
                        <p>Suggested by</p>
                        <div className="person__card">
                            <div className="image">
                                <img src="" alt="" />
                            </div>
                            <div className="info">
                                <h3>Senthil Kumaran</h3>
                                <p>CHNSETH523423</p>
                                <div className="">
                                    <p> <i className="icon-location"/> Chennai</p>
                                    <p> <i className="icon-phone"/>+91 9029301293</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="suggested-project">
                    <div className="suggested-project__details">
                        <div className="header">
                            <h2>
                                Arul Valla Naathar Temple
                            </h2>
                            <Popover placement="bottomRight" content={projectSuggestionPopover} trigger="click">
                                <i className="icon-more" />
                            </Popover>
                        </div>
                        <div className="info">
                            <h3>Thirumanacheri, Chennai</h3>
                            <h3> <i className="icon-profile"/> Sangaralingam</h3>
                            <h3>  <i className="icon-phone"/> +91 9023232342</h3>
                        </div>
                        <div className="images">
                            <img src="" alt="" /><img src="" alt="" /><img src="" alt="" />
                        </div>
                    </div>
                    <div className="suggested-project__person">
                        <p>Suggested by</p>
                        <div className="person__card">
                            <div className="image">
                                <img src="" alt="" />
                            </div>
                            <div className="info">
                                <h3>Senthil Kumaran</h3>
                                <p>CHNSETH523423</p>
                                <div className="">
                                    <p> <i className="icon-location"/> Chennai</p>
                                    <p> <i className="icon-phone"/>+91 9029301293</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default DonorSuggestions;