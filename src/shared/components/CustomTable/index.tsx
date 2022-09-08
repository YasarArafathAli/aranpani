import React, { FC, useState } from 'react'
import "./Table.scss"
import { Col, Input, Row, Select, Table, DatePicker, TablePaginationConfig } from "antd";
import moment from "moment";
import { FilterValue, SorterResult, TableCurrentDataSource, TableRowSelection } from 'antd/lib/table/interface';
import useFilters from '../../utils/useFilters';

const { Option } = Select;

interface CustomTableProps {
    data?: any;
    title: string;
    handleSearch: Function;
    placeholder?: string;
    totalRecords?: number;
    columns: any;
    loading?: boolean;
    handleRedirect?: any;
    expandable?: any;
    scroll?: any;
    rowKey?: (record: any) => string | number;
    pagination?: TablePaginationConfig | false
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void
    rowSelection?: TableRowSelection<any>
}

const CustomTable: FC<CustomTableProps> = (props) => {
    const { data, title, handleSearch, onChange, columns, scroll, pagination = {
        defaultPageSize: 50,
    },
        rowSelection, rowKey, loading, handleRedirect, expandable,  } = props;


    const {
        getParams,
    } = useFilters()

   


    return (
        <div className="custom-table">
           <div className='search-input-tab'>
                    <Input
                        className="search-input"
                        placeholder="Search by reg no., name, phone number …."
                        size="small"
                        defaultValue={getParams(['search'])?.search || ''}
                        prefix={<i className="icon-search" />}
                        onPressEnter={(e: any) => handleSearch(e?.target?.value)}
                     
                    />
            </div>

            <Table dataSource={data}    
                columns={columns}
                
                scroll={scroll}
                onRow={handleRedirect}
                loading={loading}
                onChange={onChange}
                expandable={expandable}
                rowSelection={rowSelection}
                rowKey={rowKey}
                pagination={{
                    ...pagination,
                    showSizeChanger: false
                }}
            />
        </div>
    )
}

export default CustomTable;