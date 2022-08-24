import React, {useState, useEffect} from 'react'
import ProjectService from '../../../../services/FetchProjects/ProjectService';
interface ProjectDataType {
    sl_no: number;
    Reg_Num: string;
    Temple_Name: string;
    location: string;
    start_date: string;
    end_date: string; 
    estimated_amount: number;
    expensed_amount: number;
    progess: number;
  }
function Table() {
    const {fetchProjects} = ProjectService();
    const [data, setData] = useState([]);

    useEffect(() => {
        let projects = fetchProjects()
        console.log(projects)
    })

  return (
    <div>Table</div>
  )
}

export default Table