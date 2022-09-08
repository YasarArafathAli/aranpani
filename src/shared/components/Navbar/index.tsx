import React, {useState} from "react";
import { Col, Divider, Menu, Row } from 'antd';
import "./navbar.scss";
import {Link, useNavigate} from 'react-router-dom';
import Notification from "../Notification";

import { NotificationTypes } from "../../../enums/notificationTypes";
import UserService from "../../../services/AuthService/auth.service";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import ContactDetails from "../../../views/Home/ContactDetails";

const Navbar = (props: any) => {
  const [current, setCurrent] = useState('1');
  const [showInfo, setShowInfo] = useState(false);
  const [showContactUpdate, setShowContactUpdate] = useState<boolean>(false);

  const user = JSON.parse(window.localStorage.getItem('user') || '')
  console.log(user)
  const { error, loading, logoutUser } = UserService();
  const navigate = useNavigate()

  const handleShowInfo = () => {
    setShowInfo(show => !show);
  }
  const NavItems = [
    {
      label: "Dashboard",
      icon: "icon-dashboar",
      path: AppRoutes.DASHBOARD,
    },
    {
      label: "Projects",
      icon: "icon-project",
      path: AppRoutes.PROJECTS,
    },
    {
      label: "Donors",
      icon: "icon-donor",
      path: AppRoutes.DONORS,
    },
    {
      label: "Representative",
      icon: "icon-rep",
      path: AppRoutes.REPRESENTATIVE,
    },
    {
      label: "Payment",
      icon: "icon-payment",
      path: AppRoutes.PAYMENT,
    },
    {
      label: "Internal users",
      icon: "icon-internal-users",
      path: AppRoutes.INTERNAL_USERS,
    },
    {
      label: "Subscription",
      icon: "icon-subscription",
      path: AppRoutes.SUBSCRIPTION,
    }
  ];
  const handleLogoutClick = () => {
    Notification({ message: "Logout", description: "user logged out successfully", type: NotificationTypes.SUCCESS })
    logoutUser();
  };
  const handleRedirect = (path: string) => {
    navigate(path);
  }

const UserInfo = (
  <div className={`user-info ${showInfo ? "fade-in" : "fade-out"}`}>
    <Row>
      <Col span={4} className="user-wrapper">
        <i className="icon-my-account" />
      </Col>
      <Col span={2} />
      <Col span={18}>
        <p className="name">{user?.username}</p>
      </Col>
    </Row>
    <Divider />
    <Row className="mb-5">
      <Col span={4} className="user-wrapper">
        <i className="icon-change-password" />
      </Col>
      <Col span={2} />
      <Col span={18}>
        <p className="name">Change Password</p>
      </Col>
    </Row>
    <Row onClick={handleLogoutClick} className="user-menu">
      <Col span={4} className="user-wrapper">
        <i className="icon-logout" />
      </Col>
      <Col span={2} />
      <Col span={18}>
        <p className="name">Logout</p>
      </Col>
    </Row>
  </div>
);

  return (
    
    <div className = "sidebar">
      <h1>Aran Pani</h1>
    <Menu  mode="inline" theme='dark' selectedKeys= {['1']}>
    {NavItems.map(({ label, icon, path }, index) =>
              <Menu.Item
                className={`${window.location.href.includes(path) ? "ant-menu-item-selected" : ""}`}
                key={path} onClick={() => handleRedirect(path)}>
                <i className={icon} />
                <span>{label}</span>
              </Menu.Item>
            )}

  <Menu.Item onClick={() => setShowContactUpdate(true)}
              className={"ant-menu-item"}
              style={{ paddingLeft: '24px' }}
            >
              <i className="icon-contact" />
              <span>Contact Details</span>
            </Menu.Item>
          

       
        <Menu className="bottom-side-menu">
            {showInfo && UserInfo}
            <Row className="user-card cursor-pointer" onClick={handleShowInfo}>
              <Col span={4} className="user-wrapper">
                <i className="icon-profile-placeholder" />
              </Col>
              <Col span={2} />
              <Col span={16}>
                <p className="name">{user?.username}</p>
                <p className="role">Admin</p>
              </Col>
              <Col span={2} className={`${showInfo ? "deg-180" : "deg-0"}`}>
                <i className="icon-down" />
              </Col>
            </Row>
          </Menu>
        </Menu>
        <ContactDetails showModal= {showContactUpdate} setShowModal={setShowContactUpdate}/>
    </div>
  );
}


export default Navbar;