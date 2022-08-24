import React from "react";
import {
    Route, Routes,

  } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";

import Dashboard from ".//Dashboard";
import Contact from "./Contact";
import Projects from "./Projects";
import Inusers from "./Inusers";
import Donors from "./Donors";
import './styles.scss';
// import Payment from "./Payment";
// import Representative from "./Representative";
// import Subscription from "./Subscription";
const Home = (props: any) => {
        // let NavRoutes = [
        //     { path: AppRoutes.DASHBOARD, component: <Dashboard />},
        //     { path: AppRoutes.PROJECTS, component: <Projects /> },
        //     { path: AppRoutes.DONORS, component: <Donors />},
        //     { path: AppRoutes.REPRESENTATIVES, component: <Representative />},
        //     { path: AppRoutes.PAYMENT, component: <Payment />},
        //     { path: AppRoutes.INUSERS, component: <Inusers /> },
        //     { path: AppRoutes.SUBSCRIPTION, component: <Subscription /> },
        //     { path: AppRoutes.CONTACT, component: <Contact />  },
          
        // ];
    return (
        <div>
            <Navbar />
            <div className="home">
        <Routes>
                  <Route path='/=' element={ <Dashboard />} />
                  <Route path='dashboard' element={ <Dashboard />} />
                  <Route path='/projects' element={ <Projects />} />
                  <Route path='/donors' element={ <Donors />} />
           
          </Routes>
      
            </div>
        </div>
    )
}


export default Home;
