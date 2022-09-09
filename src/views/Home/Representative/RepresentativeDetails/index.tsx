import React, {FC, useEffect, useState} from 'react'
import "./representativeDetails.scss"
import {Col, Row, Tabs} from "antd";
import Back from "../../../../shared/components/Back";
import ListDonors from "../../Donors/ListDonors";
import DonorDetails from "../../Donors/DonorDetails";
import DonorService from "../../../../services/DonorService/DonorService";
import {useParams} from "react-router-dom";

const { TabPane } = Tabs;



const RepresentativeDetails= () => {

    const { id } = useParams();

    const [tab, setTab] = useState("rep");

    const handleChange = (activeKey: string) => {
        setTab(activeKey);
    };

    const auditStatus = 'done'; 

    const {
        fetchDonor,
        donor
    } = DonorService()

    useEffect(() => {
        console.log(id)
        if (id) fetchDonor(id);
    }, [])    

    return (
        <div className="representative-details">
            <Back name={"Representative"}/>
            <Tabs defaultActiveKey={tab}
                onChange={handleChange}
            >
                <TabPane tab={"Representative Details"}
                         key={"rep"}
                >
                    <div className="rep-name-image">
                        <img src={donor?.profilePicUrl} alt={''}/>
                        <h1 className={"font-bold"}> {donor?.username} </h1>
                    </div>
                    <Row>

                            <div className={`rep-audit-status ${auditStatus}`}>
                                <div className={"font-light audit-header"}>Audit for the month</div>
                                <div className={"font-bold audit-status-info text-capitalize"}>
                                    {auditStatus} <i className={`${auditStatus === 'done' ? 'icon-paid' : 'icon-pending' }`}/>
                                </div>
                            </div>
                    
                    </Row>
                    <ListDonors listFor="representative"
                              
                                representativeId={Number(id)}
                    />
                </TabPane>
                <TabPane tab={"Profile Details"}
                         key={"profile"}
                >
                   <DonorDetails hideBack/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default RepresentativeDetails;