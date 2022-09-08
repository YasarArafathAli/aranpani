import React, {FC, useEffect, useState} from 'react'
import "./donorSubscriptionDropdown.scss"
import {Col, Row, Select} from "antd";
import SubscriptionService from '../../../../services/SubscriptionService/subscription.service';

interface DonorSubscriptionDropdownProps {
    onChange?: (value:number)=>void;
    onSelect?: (id:number)=>void;
    disabled?: boolean;
    value?:any;
    className?:string;
    resetDropdown?:boolean;
}

const DonorSubscriptionDropdown: FC<DonorSubscriptionDropdownProps> = (props) => {
    const { onChange, onSelect, disabled, value, className, resetDropdown } = props;

    const [selectedValue, setSelectedValue] = useState<number>();

    const {
        fetchSubscriptionList,
        subscriptionList,
    } = SubscriptionService()

    useEffect(() => {
        fetchSubscriptionList()
    }, [])

    useEffect(()=>{
        resetDropdown && setSelectedValue(undefined)
    },[resetDropdown])

    const handleChange = (value:number) => {
        setSelectedValue(value)
    };

    const options = subscriptionList?.map((sub:any)=>({
        label: <div className="subscription-label">
            <Row>
                <Col span={18} offset={1}>
                    <div className={"subscription-label__title"}>
                        {sub?.name||""}
                    </div>
                    <div className={"subscription-label__info"}>
                        Donate {sub?.amount||""} for every {sub?.period}
                    </div>
                </Col>
                <Col span={5}>
                    <h1 className={"font-bold subscription-label__amount"}>₹ {sub?.amount}</h1>
                </Col>
            </Row>
        </div>,
        value: sub?.id || -1
    }))

    return (
        <div className="donor-subscription-dropdown">
            <Select
                options={options}
                placeholder={"Select subscription"}
                onChange={onChange ? onChange : handleChange}
                onSelect={onSelect ? onSelect : undefined}
                disabled={disabled}
                showArrow={true}
                dropdownMatchSelectWidth={false}
                value={selectedValue ?? value}
                className={className}
            />
        </div>
    )
}

export default DonorSubscriptionDropdown;