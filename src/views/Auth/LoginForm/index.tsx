import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { validationSchema } from "./LoginValidation";
import { Button } from "antd";
import UserService from "../../../services/AuthService/auth.service";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { AuthContext } from "../../../context/AuthContext";
import { url } from "inspector";
import "./styles.scss";
interface User {
  email: string;
  password: string;
}

const initialValue = {
  email: "abc@123.com",
  password: "test@1234",
};

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
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor="email">Email ID</label>
          <InputField type="email" name="email" placeholder="Enter email" />
          <label htmlFor="password">Password</label>
          <InputField
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <a className = 'fp' href="#">Forgot Password</a>
          <Button htmlType="submit">Login</Button>
        </Form>
      </Formik>
    </div>
    </div>
  );
};

export default LoginForm;
