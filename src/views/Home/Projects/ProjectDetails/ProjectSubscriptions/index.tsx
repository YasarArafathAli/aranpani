import React, {FC, useEffect} from 'react'
import "./projectSubscriptions.scss"
import CustomCard from "../../../../../shared/components/CustomCard";
import {useParams} from "react-router-dom";
import ProjectSubscriberService from "../../../../../services/ProjectService/projectSubscriber.service";
import userPlaceholder from "../../../../../assets/userPlaceholder.png";

interface ProjectSubscriptionsProps {

}

const ProjectSubscriptions: FC<ProjectSubscriptionsProps> = (props) => {
    const { } = props;

    const {id} = useParams();

    const { fetchSubscribedDonors, subscribedDonors} = ProjectSubscriberService();

    useEffect(()=>{
        id && fetchSubscribedDonors((id)).then()
    },[id])

    return (
        <div className="project-subscriptions">
            <CustomCard>
                <div className="status">
                    <h3 className="title">{subscribedDonors?.length} Subscriptions</h3>
                    <div className="sub-title">Donors who subscribed to this project</div>
                    {subscribedDonors?.map(donor =>
                        <div className="subscriber mb-1 mt-4">
                            <img className="img-circular float-left"
                                 src={donor.profilePicUrl ?? userPlaceholder}
                                 alt=''
                            />
                            <h3 className="title ml-2">{donor.username}</h3>
                            <div className="sub-title ml-2">
                                <i className="icon-phone"></i>
                                +91 {donor.mobileNumber}
                            </div>
                        </div>
                    )}
                </div>
            </CustomCard>
        </div>
    )
}

export default ProjectSubscriptions;