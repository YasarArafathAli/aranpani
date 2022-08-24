import React, {useState} from "react";
import { Menu } from 'antd';
import "./navbar.scss";
import {Link} from 'react-router-dom';
import Notification from "../Notification";
import { NotificationTypes } from "../../../enums/notificationTypes";
import UserService from "../../../services/AuthService/auth.service";
const Navbar = (props: any) => {
  const [current, setCurrent] = useState('1');
  const { error, loading, logoutUser } = UserService();
  const handleLogoutClick = () => {
    Notification({ message: "Logout", description: "user logged out successfully", type: NotificationTypes.SUCCESS })
    logoutUser();
  };

  return (
    
    <div className = "sidebar">
      <h1>Aran Pani</h1>
    <Menu  mode="inline" theme='dark' selectedKeys= {['1']}>
      <Menu.Item 
      className="navbar-item" key="dashboard">
      <Link to='/dashboard'> DashBoard</Link>
        </Menu.Item>
      <Menu.Item className="navbar-item" key="projects">
      <Link to='/projects'> Projects</Link>

        </Menu.Item>
      <Menu.Item className="navbar-item" key="donors">
      <Link to='/donors'> Donors</Link>

        </Menu.Item>
        <Menu.Item className="navbar-item" key="representative">
        <Link to='/dashboard'> DashBoard</Link>

        </Menu.Item>
        <Menu.Item  className="navbar-item" key="payment">
        <Link to='/dashboard'> DashBoard</Link>

        </Menu.Item>
        <Menu.Item onClick={handleLogoutClick} className="navbar-item" key="logout">
        Logout
        </Menu.Item>
        
    </Menu>
    </div>
  );
}

export default Navbar;