import { pushToast } from "components/Toast";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormLogin from "./FormLogin/FormLogin";
import "./Login.scss";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    pushToast("success", location.state?.successful);
  }, [location]);

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
