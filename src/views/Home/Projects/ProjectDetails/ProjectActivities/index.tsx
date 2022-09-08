import React, {FC, useState, useEffect} from 'react'
import "./projectActivities.scss"
import { Steps } from "antd";
import CustomCard from "../../../../../shared/components/CustomCard";
import moment from "moment";
import ProjectActivityService from "../../../../../services/ProjectService/projectActivity.service";
import ProjectActivityForm from "./ProjectActivityForm";
import {useParams} from "react-router-dom";
import {ProjectActivityModel} from "../../../../../models/project.help.model";

const { Step } = Steps;

interface ProjectActivitiesProps {
}

const ProjectActivities: FC<ProjectActivitiesProps> = () => {
    const {id} = useParams();

    const { fetchProjectActivities, activityList } = ProjectActivityService();

    const [currentActivity, setCurrentActivity] = useState<ProjectActivityModel|null>();
    const [showNewForm, setShowNewForm] = useState<boolean>(false);

    useEffect(()=>{
        id && refreshProjectActivities()
    },[id])
 // @ts-ignore: Unreachable code error
    const refreshProjectActivities = () => fetchProjectActivities(id).then()

    return (
        <div className="project-activities">
            <div className="title">
                <h3 className="mr-5 mb-0"><b>Activity</b></h3>
                <i className="icon-add mt-1 cursor-pointer"
                   style={{ color: "blue" }}
                   onClick={()=>{
                       setShowNewForm(true)
                       setCurrentActivity(null)
                   }}
                />
            </div>
            <Steps progressDot current={activityList?.length} direction="vertical">
             
                {showNewForm &&
                    <Step title={moment().format("DD/MM/YYYY")} description={
                        <CustomCard>
                            <ProjectActivityForm handleCancel={()=>setShowNewForm(false)}
                                                 refreshList={refreshProjectActivities}
                            />
                        </CustomCard>
                    } />
                }

                {activityList?.map(activity =>
                    <Step title={moment(activity?.createdAt).format("DD/MM/YYYY")} description={
                        <CustomCard>
                            {currentActivity?.id === activity?.id ?
                                <ProjectActivityForm currentActivity={currentActivity}
                                                     handleCancel={()=>setCurrentActivity(null)}
                                                     refreshList={refreshProjectActivities}
                                />
                                :
                                <>
                                    <i className="icon-edit" onClick={() => {
                                        setCurrentActivity(activity)
                                        setShowNewForm(false)
                                    }}/>
                                    <div>
                                        {activity.attachments?.map((attachment:any) =>
                                            <div className="project-activities__image" key={`image-${attachment.id}`}>
                                                <img src={attachment.imageUrl} alt={''}/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="sub-title mt-4 mb-2">
                                        Description (English)
                                    </div>
                                    <div className="">
                                        {activity.contentEnglish}
                                    </div>
                                    <div className="sub-title mt-4 mb-2">
                                        விளக்கம் (தமிழ்)
                                    </div>
                                    <div className="">
                                        {activity.contentTamil}
                                    </div>
                                </>
                            }
                        </CustomCard>
                    } />
                )}
            </Steps>
        </div>
    )
}

export default ProjectActivities;