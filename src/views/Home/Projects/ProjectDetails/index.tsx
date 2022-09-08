import { Col, Row } from "antd";
import React, {FC, useEffect} from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../../../../services/ProjectService/ProjectService";
import Back from "../../../../shared/components/Back";
import "./projectDetails.scss";
import ProjectHeader from "./ProjectHeader";
import ProjectImages from "./ProjectImages";
import ProjectBasicInfo from "./ProjectBasicInfo";
import ProjectStatus from "./ProjectStatus";
import ProjectLocation from "./ProjectLocation";
import ProjectDocuments from "./ProjectDocuments";
import ProjectSubscriptions from "./ProjectSubscriptions";
import ProjectActivities from "./ProjectActivities";

interface ProjectDetailsProps { }

const ProjectDetails: FC<ProjectDetailsProps> = ( ) => {
  const { id } = useParams();

  const { fetchProject, loading, project } = ProjectService();
  const refreshProject = () => {
    if (id) fetchProject(Number(id));
    
  }
  useEffect(() => {

      refreshProject();
  }, []);

  return (
    <div className="project-details mt-5">
      <Back name="Projects" />
      <div className="header mt-5">
        <ProjectHeader {...{
                          projectId: Number(id),
                          refreshProject,
                          project
                        }}
        />
      </div>

      <Row>
        <Col className="left-col" span={15}>
          <ProjectImages project={project}/>
          <ProjectBasicInfo projectId={Number(id)}
                            project={project}
                            refreshProject={refreshProject}
          />
          {project?.status !== "proposed" && project?.status !== "planned" &&
            <ProjectActivities />
          }
        </Col>

        <Col className="right-col" span={8}>
          <ProjectStatus project={project}
                         refreshProject={refreshProject}
          />
          <ProjectLocation project={project}/>
          <ProjectDocuments project={project}/>
          {project?.status !== "proposed" && <ProjectSubscriptions/>}
        </Col>

      </Row>
    </div>
  );
};

export default ProjectDetails;
