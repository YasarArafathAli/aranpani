import React, {  useEffect, useState } from 'react'
import "./representatives.scss"
import CustomTable from "../../../shared/components/CustomTable";
import { generatePath } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { useNavigate } from "react-router-dom";
import AreaRepService from "../../../services/AreaRepService/AreaRepService";
import { DonorModel } from "../../../models/donors.model";
import useFilters from '../../../shared/utils/useFilters';
import { TablePaginationConfig } from 'antd';
import DonorForm from '../Donors/DonorForm';



const Representative = () => {
   
    const [areaRepModal, setAreaRepModal] = useState(false)
    const navigate = useNavigate();
    const {
        setParams,
        getParams,
    } = useFilters()

    const { fetchAreaRepList, repPagination, areaRepLoading, areaRepList } = AreaRepService();

    useEffect(() => {
        fetchAreaRepList({
            search: getParams(["search"])?.search || '',
            page: getParams(["page"])?.page || 1,
        }).then()
    }, [])

    const columns = [
        // {
        //     title: "S No",
        //     dataIndex: "id",
        //     key: "id",
        //     width: 70,
        //     render: (text: string, record: UserModel) => (areaRepList.indexOf(record) + 1)
        //     //render: (_: any, __: any, index: number) => index + 1,
        // },
        {
            title: "Donor ID",
            dataIndex: "regNumber",
            key: "regNumber",
            width: 100,
        },
        {
            title: "Name",
            dataIndex: "username",
            key: "username",
            width: 150,
            ellipsis: true,
        },
        {
            title: "Mobile",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
            width: 150,
            render: (text: String, record: DonorModel) => <span>{`${record.isdCode || ''}-${record.mobileNumber || ''}`}</span>
        },
        {
            title: "Donor #",
            dataIndex: "donorsCount",
            key: "donorsCount",
            width: 100,
        },
        {
            title: "Country",
            dataIndex: ["country", "name"],
            key: "country",
            width: 60,
            ellipsis: true,
        },
        {
            title: "State",
            dataIndex: ["state", "name"],
            key: "state",
            width: 60,
            ellipsis: true,
        },
        {
            title: "District",
            dataIndex: ["city", "name"],
            key: "city",
            width: 90,
            ellipsis: true,
        },
        {
            title: "Pincode",
            dataIndex: "pinCode",
            key: "pinCode",
            width: 80,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 90,
            render: (text: string, record: any) =>
                <span className={`${record?.status ? 'text-active' : 'text-inactive'}`}>
                    {record?.status ? 'Active' : 'Inactive'}
                </span>
        },
    ];

    const handleRowClick = (donor: DonorModel) => ({
        onClick: () => {    
            navigate(generatePath(AppRoutes.REPRESENTATIVE_DETAILS,{id: String(donor.id)}));
        },
    });

    const handleSearch = (search: string) => {
        setParams({ search, page: 1 })
        fetchAreaRepList({ search, page: 1 })
    }

    const tableChangeHandler = (pagination: TablePaginationConfig) => {
        setParams({ ...getParams(['search']), page: pagination.current })
        fetchAreaRepList({
            page: pagination.current,
        });
    }
    const closeFormHandler = (response?: boolean) => {
        setAreaRepModal(false);
        
      };
    return (
        <div className="representatives">
            <div className="header">

<h1>
  Representatives
  <span className='add-project'>
    <i className='icon-add-2' onClick={() => setAreaRepModal(true)}></i>
  </span>
</h1>
</div>

            <CustomTable title={"Area Representative"}
                scroll={{ x: true }}
                handleSearch={handleSearch}
                columns={columns}
                data={areaRepList}
                onChange={tableChangeHandler}
                loading={areaRepLoading}
                totalRecords={repPagination?.totalCount || 0}
                handleRedirect={handleRowClick}
                pagination={{
                    pageSize: 50,
                    current: repPagination?.currentPage || 1,
                    total: repPagination?.totalCount,
                    showTotal: (total: number, range: [number, number]) => <p>Showing <b>{` ${range[0]} - ${range[1]}`}</b> of <b>{`${total.toLocaleString()}`}</b></p>
                }}
            />
 <DonorForm
        showModal={areaRepModal}
        setShowModal={closeFormHandler}
      />

        </div>
    )
}

export default Representative;