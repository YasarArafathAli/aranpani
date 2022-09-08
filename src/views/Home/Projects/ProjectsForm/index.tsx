import React from 'react'
import {Button, Modal} from 'antd'
import { Form, Formik, validateYupSchema } from 'formik'
import { Project } from '../../../../models/project.model'
import CustomInput from '../../../../shared/components/CustomInput'
import ProjectService from '../../../../services/ProjectService/ProjectService'
import { ProjectTypes } from '../../../../enums/projectTypes'
function ProjectForm(props: any) {
  const {showModal,setShowModal, fetchProjectList} = props
  const {createProject, loading} = ProjectService();
  const handleSubmit = (values:any) => {
    values.status = ProjectTypes .PROPOSED.toLowerCase();
    createProject(values).then(() => {
        fetchProjectList(ProjectTypes.PROPOSED).then(() => setShowModal(false))
    })
  }
    return (
    <Modal
    title = {
        <div className='modal-title'>New Project
        </div>
    }
    visible = {showModal}
    onCancel = {() => setShowModal(false)}
        footer={null}
    >
        <Formik
        initialValues={new Project()}
        onSubmit = {handleSubmit}
        >

            {({values, setFieldValue}) => {
               return (
            <Form>
                <CustomInput type='text' name='name' placeholder= "Type Name" title = "Temple Name" />  
                <CustomInput type='text' name='templeNameTamil' placeholder= "Type Name" title = "கோவில் பெயர்" />  
                <CustomInput type='text' name='inchargeName' placeholder= "Type Incharge Name" title = "Temple Incharge Name" />  
                <CustomInput type='text' name='TamilInchargeName' placeholder= "Type Incharge Name" title = "கோவில் பொறுப்பாளர் பெயர்" />  
                <CustomInput type='text' name='inchargePhoneNumber' placeholder="Type Number" prefix='+91' title = "Phone Number" />    
                <CustomInput type='text' name='location' placeholder= "Type Location" title = "Location" />  
                <CustomInput type='text' name='locationTamil' placeholder= "Type Location" title = "இடம்" />  
                <Button type='primary' htmlType='submit' loading ={loading} block>Create Project</Button>
                </Form>
            )}}
        </Formik>
    </Modal>
  )
}

export default ProjectForm