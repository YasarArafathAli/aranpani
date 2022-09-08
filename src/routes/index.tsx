import React from "react";
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
import ListDonors from "../views/Home/Donors/ListDonors";
import Representative from "../views/Home/Representative";
import RepresentativeDetails from "../views/Home/Representative/RepresentativeDetails";
import Payment from "../views/Home/Payment";
import Inusers from "../views/Home/Inusers";
import Subscription from "../views/Home/Subscriptions";
import ProjectDetails from "../views/Home/Projects/ProjectDetails";
import DonorDetails from "../views/Home/Donors/DonorDetails";




export const appHistory = createBrowserHistory();

const isLoggedIn = window.localStorage.getItem('isLoggedIn');
const AppRouter = () => {
  let routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.HOME, component: isAuthenticated(<Home />) },
  ]
    
    
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.AUTH} element= {<AuthWrapper />} />
          <Route path={AppRoutes.HOME} element= {<Home />} >
          {/* <Route path={AppRoutes.HOME} element= {isAuthenticated(<Home />)} > */}
            <Route path={AppRoutes.DASHBOARD} element= {<Dashboard />} />
            <Route path={AppRoutes.PROJECTS} element= {<Projects />} />
              <Route path={AppRoutes.PROJECT_DETAILS } element = {<ProjectDetails />} />
            <Route path={AppRoutes.DONORS} element= {<ListDonors />} />
            <Route path={AppRoutes.DONOR_DETAILS} element= {<DonorDetails />} />
            <Route path={AppRoutes.PAYMENT} element= {<Payment />} />
            <Route path={AppRoutes.REPRESENTATIVE} element= {<Representative />} />
            <Route path={AppRoutes.REPRESENTATIVE_DETAILS} element= {<RepresentativeDetails />} />
            <Route path={AppRoutes.SUBSCRIPTION} element= {<Subscription />} />
            <Route path={AppRoutes.INTERNAL_USERS} element= {<Inusers />} />
         
          </Route>
                
        </Routes>
              

        
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
