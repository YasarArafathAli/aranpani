import React, { FC, useEffect, useState } from 'react';
import './listdonors.scss';
import DonorForm from '../DonorForm';
import CustomTable from '../../../../shared/components/CustomTable';
import ListDonorsHeader from './DonorsHeader';

import { Menu, TablePaginationConfig } from 'antd';
import { generatePath } from 'react-router-dom';
import { AppRoutes } from '../../../../routes/routeConstants/appRoutes';
import { useNavigate } from 'react-router';
import DonorService from '../../../../services/DonorService/DonorService';
import { DonorModel } from '../../../../models/donors.model';
import useFilters from '../../../../shared/utils/useFilters';

interface ListDonorProps {
  listFor?: string;
  showMonth?: boolean;
  representativeId?: number;
}

const ListDonors: FC<ListDonorProps> = ({
  listFor,
  representativeId,
}) => {
  const navigate = useNavigate();

  const { fetchDonorList, donorPagination, donorList, donorLoading } =
    DonorService();

  const { getParams, setParams } = useFilters();

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    fetchDonorList({
      representative_id: representativeId,
      page: donorPagination?.currentPage || getParams(['page'])?.page || 1,
      search: getParams(['search'])?.search || '',
    }).then();
  }, []);

  const [columns, setColumns] = useState([
    {
      title: 'Donor ID',
      dataIndex: 'regNumber',
      key: 'regNumber',
      width: 70,
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      width: 130,
      ellipsis: true,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 150,
    },
    {
      title: 'Group #',
      dataIndex: 'numberOfMembers',
      key: 'numberOfMembers',
      width: 90,
    },
    {
      title: 'Type',
      dataIndex: 'donorType',
      key: 'donorType',
      width: 130,
    },
    {
      title: 'Group Head',
      dataIndex: 'headRegNumber',
      key: 'headRegNumber',
      width: 120,
    },
    {
      title: 'Country',
      dataIndex: ['country', 'name'],
      key: 'country',
      width: 50,
    },
    {
      title: 'State',
      dataIndex: ['state', 'name'],
      key: 'state',
      width: 50,
    },
    {
      title: 'District',
      dataIndex: ['city', 'name'],
      key: 'city',
      width: 50,
    },
    {
      title: 'Pincode',
      dataIndex: 'pinCode',
      key: 'pinCode',
      width: 50,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 60,
    },
  ]);

  useEffect(() => {
    if (listFor === 'representative') {
      columns.splice(4, 1);
      setColumns([
        ...columns.slice(0, 8),
        {
          title: 'Donation',
          dataIndex: 'donation',
          key: 'donation',
          width: 100,
        },
        ...columns.slice(8),
        {
          title: 'Last pay',
          dataIndex: 'lastPay',
          key: 'lastPay',
          width: 100,
        },
      ]);
    }
  }, [listFor]);

  const closeFormHandler = (response?: boolean) => {
    setCreateModalVisible(false);
    if (response)
      fetchDonorList({
        representative_id: representativeId,
        page: donorPagination?.currentPage || getParams(['page'])?.page || 1,
        search: getParams(['search'])?.search || '',
      }).then();
  };

  const tableChangeHandler = (pagination: TablePaginationConfig) => {
    setParams({ ...getParams(['search']), page: pagination.current });
    fetchDonorList({
      representative_id: representativeId,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {}}>
        <span className="change-rep-menu-item">
          <i className={'icon-rep'} /> Change Representative
        </span>
      </Menu.Item>
    </Menu>
  );

  const handleRowClick = (donor: DonorModel) => ({
    onClick: () => {
      setParams( { ...getParams(['search','page']), id:donor.id})
      // if (donor.type !== DonorClassTypes.CONTRIBUTOR)
        navigate(
          generatePath(AppRoutes.DONOR_DETAILS, {
            id: donor.id?.toString(),
          })
        );
    },
  });

  const handleSearch = (search: string) => {
    setParams({ search, page: 1 });
    fetchDonorList({ search, representative_id: representativeId, page: 1 });
  };

  return (
    <div className="list-donors">
      {!listFor && (
        <ListDonorsHeader
          selectedDonorIds={selectedRowKeys}
          setCreateModalVisible={setCreateModalVisible}
          successHandler={() => setSelectedRowKeys([])}
        />
      )}

      <CustomTable
        title={'Donor'}
        columns={columns}
        scroll={{ x: true }}
        handleSearch={handleSearch}
        handleRedirect={handleRowClick}
        onChange={tableChangeHandler}
        data={donorList}
        loading={donorLoading}
        totalRecords={donorPagination?.totalCount || 0}
        pagination={{
          pageSize: 50,
          current: donorPagination?.currentPage || 1,
          total: donorPagination?.totalCount,
          showTotal: (total: number, range: [number, number]) => (
            <p>
              Showing <b>{` ${range[0]} - ${range[1]}`}</b> of{' '}
              <b>{`${total.toLocaleString()}`}</b>
            </p>
          ),
        }}
        rowKey={(donor: DonorModel) => donor.id as number}
        rowSelection={{
          selectedRowKeys: selectedRowKeys as any,
          onChange: setSelectedRowKeys as any,
        }}
      />

      <DonorForm
        showModal={createModalVisible}
        setShowModal={closeFormHandler}
      />

  
    </div>
  );
};

export default ListDonors;
