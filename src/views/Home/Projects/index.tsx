import React, { useEffect, useState } from 'react'
import './styles.scss'
import CustomTable from '../../../shared/components/CustomTable';
import { Tabs } from 'antd';
import ProjectsForm from './ProjectsForm';
import moment from 'moment';
import ProjectService from '../../../services/ProjectService/ProjectService';
import { ColumnsType } from 'antd/lib/table';
import { Project } from '../../../models/project.model';
import { generatePath,useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../routes/routeConstants/appRoutes';
import { ApiRoutes } from '../../../routes/routeConstants/apiRoutes';


const {TabPane} = Tabs;


const ColumnType1: ColumnsType<Project> = [
  {
    title: 'Reg Number',
    dataIndex: 'reg_number',
    key: 'reg_number',
  //   render: text=> <a>{text}</a>,
  },
  {
      title: "Temple Name",
      dataIndex: 'name',
      key : 'name'
  },
  {
          title :'Location',
          dataIndex : "location",
          key : 'location' ,
  },
  {
      title :  'Start Date',
      dataIndex : 'startDate',
      key : 'startDate',
      render: (date:string) => moment(date).format("DD/MM/YYYY")
},
{
  title : 'End Date',
  dataIndex : 'endDate',
  key : 'endDate',
  render: (date:string) => moment(date).format("DD/MM/YYYY")

},
{
  title : 'Estimated Amount',
  dataIndex : 'estimated_amt',
  key : 'estimated_amt',
},
{
  title : 'Expensed Amount', 
  dataIndex : 'expensed_amt',
  key : 'expensed_amt',
},
{
  title :'Progress',
  dataIndex : 'progress',
  key : 'progress',
}
]

const ColumnType2: ColumnsType<Project> = [
{
  title: 'Reg Number',
  dataIndex: 'reg_number',
  key: 'reg_number',
//   render: text=> <a>{text}</a>,
},
{
    title: "Temple Name",
    dataIndex: 'name',
    key : 'name'
},
{
        title :'Location',
        dataIndex : "location",
        key : 'location' ,
},
{
    title :  'Created On',
    dataIndex : 'created_at',
    key : 'created_at',
    render: (date:string) => moment(date).format("DD/MM/YYYY")

},
]
const Projects = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState('Proposed');
  const [projectModal, setProjectModal] = useState(false)
  const statusTabs = ['Proposed', "Planned", 'Active', 'Completed', 'Scrapped']

  const {projects,fetchProjects} = ProjectService();
    useEffect(() => {
      if(activeStatus){
        fetchProjectsList(activeStatus);
      }  
    },[activeStatus])



    const fetchProjectsList = async (type: string) => {
      await fetchProjects(type);
    }

    const redirectProject = (project:Project) => ({
      onClick: () => {
        console.log(project)
        navigate(generatePath(AppRoutes.PROJECT_DETAILS,{id: String(project.id)}))
      }
    })

    const handleSearch = (search:string) => {
      fetchProjects(activeStatus,{search})
    }
  return (
  <div className='main-container'>
<div className='header'>

  <h1>
    Projects
    <span className='add-project'>
      <i className='icon-add-2' onClick={() => setProjectModal(true)}></i>
    </span>
  </h1>
</div>
    <Tabs defaultActiveKey='1'  onChange = {(key) => setActiveStatus(key)} destroyInactiveTabPane
    >
      {statusTabs.map((status, index) => {
        return <TabPane key={status} tab={status}>
          <CustomTable  title = {'Project'} columns = {activeStatus === 'Proposed' ? ColumnType2 :ColumnType1} handleRedirect={redirectProject}  data = {projects}  handleSearch={handleSearch}/>
        </TabPane>
      })}
      <ProjectsForm showModal={projectModal} setShowModal = {setProjectModal} fetchProjectList = {fetchProjectsList} />
    </Tabs>
  </div>
); } 

export default Projects