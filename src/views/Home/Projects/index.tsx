import React from 'react'
import Navbar from '../../../shared/components/Navbar'
import '../styles.scss'
import {Tabs} from 'antd'
const {TabPane} = Tabs;
function Projects() {
  return (
    <div>
      <Navbar />
    <div className='home-pane'>
      <h1>Projects</h1>
      <div>
      <ProjectTab />
      </div>
    </div> </div>)
}

const ProjectTab: React.FC = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Proposed" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Planned" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Active" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Completed" key="4">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Scrapped" key="5">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

export default Projects