import React from "react";
import { Formik, Form } from "formik";
import CustomInput from "../../../shared/components/CustomInput";
import { validationSchema } from "./LoginValidation";
import { Button } from "antd";
import UserService from "../../../services/AuthService/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { AuthContext } from "../../../context/AuthContext";
import { url } from "inspector";
import "./styles.scss";
import { User } from "../../../models/user.model";

const LoginForm = (props: any) => {
  const { error, loading, loginUser } = UserService();


  const onSubmit = (user: User) => {
    loginUser(user);
  };

  return (
    <div className="page">
      <div><h1>Welcome back to <strong>Aran Pani</strong></h1></div>
    
    <div className="loginCard">
      <h2>Login into admin portal</h2>
      <Formik
        initialValues={new User()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor="email">Email ID</label>
          <CustomInput type="email" name="email" placeholder="Enter email" />
          <label htmlFor="password">Password</label>
          <CustomInput
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <Link className = 'fp' to='/forgot-password'>Forgot Password</Link> 
          <Button htmlType="submit">Login</Button>
        </Form>
      </Formik>
    </div>
    </div>
  );
};

export default LoginForm;
