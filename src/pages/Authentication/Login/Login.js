import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import { Link } from "react-router-dom";
import FormLogin from "./FormLogin/FormLogin";
import "./Login.scss";

const Login = () => {
  return (
    <AuthLayout>
      <div className="login-wrapper">
        <div className="login-title">
          <h3 className="text">ĐĂNG NHẬP</h3>
        </div>
        <div className="login-form">
          <FormLogin />
        </div>
        <div className="directional-signup">
          <p>Chưa có tài khoản ? </p>
          <Link to="/signup" className="directional-signup-link">
            Đăng ký
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
