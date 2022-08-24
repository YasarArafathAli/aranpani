import React, { FC, useContext, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthWrapper from "../views/Auth/AuthWrapper";
import isAuthenticated from "../shared/components/HOC/requireAuth";
import Home from "../views/Home";
import { RouterProps } from "../shared/types/route.type";
import AppComponents from "../views/AppComponents";
import { AppRoutes } from "./routeConstants/appRoutes";
import Dashboard from "../views/Home/Dashboard";
import Projects from "../views/Home/Projects";
import Donors from "../views/Home/Donors";
import Representative from "../views/Home/Representative";
import Payment from "../views/Home/Payment";
import Inusers from "../views/Home/Inusers";
import Subscription from "../views/Home/Subscription";
import Contact from "../views/Home/Contact";




export const appHistory = createBrowserHistory();

const isLoggedIn = window.localStorage.getItem('isLoggedIn');
const AppRouter = () => {
  let routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.HOME, component: isAuthenticated(<Home />) },
    { path: AppRoutes.DASHBOARD, component: <Dashboard />},
    { path: AppRoutes.PROJECTS, component: <Projects /> },
    { path: AppRoutes.DONORS, component: <Donors />},
    { path: AppRoutes.REPRESENTATIVES, component: <Representative />},
    { path: AppRoutes.PAYMENT, component: <Payment />},
    { path: AppRoutes.INUSERS, component: <Inusers /> },
    { path: AppRoutes.SUBSCRIPTION, component: <Subscription /> },
    { path: AppRoutes.CONTACT, component: <Contact />  },
    
  ];
  if (Boolean(process.env.REACT_APP_UNDER_DEVELOPMENT)) {
    routes.push({
      path: AppRoutes.APP_COMPONENTS,
      component: AppComponents,
    });
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes?.map((route, index) => {
            return (
              
              <Route
                key={index}
                path={route?.path}
                element={route?.component}
              />
            );
          })}
          {/* <Route path="*" element={<Navigate to={AppRoutes.AUTH} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
