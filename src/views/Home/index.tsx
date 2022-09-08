import React from "react";
import {
    Route, Routes,

  } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";

import Dashboard from ".//Dashboard";
import Projects from "./Projects";
import Inusers from "./Inusers";
import Donors from "./Donors/ListDonors";
import './styles.scss';
import Payment from "./Payment";
import Representative from "./Representative";
import Subscriptions from "./Subscriptions";
import ListDonors from "./Donors/ListDonors";
import DonorDetails from "./Donors/DonorDetails";
import ProjectDetails from "./Projects/ProjectDetails";
const Home = (props: any) => {
        let navRoutes = [
            { path: AppRoutes.DASHBOARD, component: <Dashboard />},
            { path: AppRoutes.PROJECTS, component: <Projects /> },
            { path: AppRoutes.PROJECT_DETAILS, component: <ProjectDetails /> },
            { path: AppRoutes.DONORS, component: <ListDonors />},
            { path: AppRoutes.DONOR_DETAILS, component: <DonorDetails />},
            { path: AppRoutes.REPRESENTATIVE, component: <Representative />},
            { path: AppRoutes.PAYMENT, component: <Payment />},
            { path: AppRoutes.INTERNAL_USERS, component: <Inusers /> },
            { path: AppRoutes.SUBSCRIPTION, component: <Subscriptions /> },
          
        ];
    return (
        <div>
            <Navbar />
            <div className="home-pane">
        <Routes>
                 {navRoutes.map((route, index) => {
                    return (<Route key={index} path={route.path} element={route.component} />)
                 })}
                  {/* <Route path='/=' element={ <Dashboard />} />
                  <Route path='dashboard' element={ <Dashboard />} />
                  <Route path='/projects' element={ <Projects />} />
                  <Route path='/donors' element={ <Donors />} /> */}
           
          </Routes>
      
            </div>
        </div>
    )
}


export default Home;
