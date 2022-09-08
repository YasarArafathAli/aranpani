import React, {FC, useEffect, useState} from 'react'
import "./donorRepDropdown.scss"
import {Col, Row, Select} from "antd";
import userPlaceholder from "../../../../assets/userPlaceholder.png";
import AreaRepService from "../../../../services/AreaRepService/AreaRepService";
import {useParams} from "react-router-dom";

interface DonorRepDropdownProps {
    onChange?: (value:number)=>void;
    onSelect?: ()=>void;
    disabled?: boolean;
    value?:any;
    className?:string;
    repUpdateHandler?:Function;
    donorDetail?:boolean;
}

const DonorRepDropdown: FC<DonorRepDropdownProps> = (props) => {
    const { onChange, onSelect, disabled, value, className, repUpdateHandler, donorDetail } = props;

    const {id} = useParams();

    const { fetchAreaRepList, areaRepList, fetchNearbyAreaRepList } = AreaRepService();

    const [selectedValue, setSelectedValue] = useState<number>();

    useEffect(()=>{
        donorDetail && id ? fetchNearbyAreaRepList(Number(id)).then() : fetchAreaRepList().then()
    },[])

    const options = areaRepList?.map(areaRep => ({
        value: areaRep.id ?? 0,
        label: <div className="donor-rep-dropdown__label">
            <div className={"donor-rep-dropdown__label__image"}>
                <img src={areaRep?.profilePicUrl ?? userPlaceholder} alt={''}/>
            </div>
            <div className={"donor-rep-dropdown__label__info"}>
                <div className={"donor-rep-dropdown__label__name font-semi-bold"}>{areaRep.username}</div>
                <div className={"sub-title donor-rep-dropdown__label__id"}>{areaRep.regNumber}</div>
                <div className={"donor-rep-dropdown__label__details"}>
                    <Row>
                        <Col span={11} className='text-capitalize'>
                            <i className={"icon-location"}/> {areaRep.city?.name || ''}
                        </Col>
                        <Col span={11}>
                            <i className={"icon-phone"}/> +91 {areaRep.mobileNumber}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>,
        title: `${areaRep.username} ${areaRep.regNumber} ${areaRep.mobileNumber}`
    }))

    const handleChange = (value:number) => {
        setSelectedValue(value);
        repUpdateHandler && repUpdateHandler(value);
    };

    return (
        <div className="donor-rep-dropdown">
            <Select options={options}
                    placeholder={"Select Area Representative"}
                    onChange={onChange ? onChange : handleChange}
                    onSelect={onSelect ? onSelect : undefined}
                    disabled={disabled}
                    showArrow={true}
                    dropdownMatchSelectWidth={false}
                    value={selectedValue ?? value}
                    className={className}
                    showSearch
                    filterOption={(input, option) =>
                        // @ts-ignore: Unreachable code error
                         option?.title?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                    }
            />
        </div>
    )
}

export default DonorRepDropdown;