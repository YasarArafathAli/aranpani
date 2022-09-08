import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";
import { RouterProps } from "../../shared/types/route.type";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.REGISTER, component: <RegisterForm/> },
    { path: AppRoutes.LOGIN, component: <LoginForm/> },
  ];

  const isLoggedIn = localStorage.getItem('isLoggedin') === 'true';
  return (
    <Routes>
      {routes.map(({ component, ...routerProps },index) => (
        <Route key={index} {...routerProps} element={component} />
      ))}
      <Route  path="*" element={<Navigate to={ isLoggedIn? NavigationRoutes.HOME:  NavigationRoutes.LOGIN }/>} />
    </Routes>
  );
};

export default authRouter;
