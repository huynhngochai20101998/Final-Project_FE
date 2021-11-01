import React from "react";
import "./AuthNavbar.scss";

import Logo from "../../../assets/images/logo.svg";
import LogoName from "../../../assets/images/name-lodo.svg";
import IconLang from "../../../assets/icons/icon-lang.svg";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <div className="auth-navbar">
      <div className="auth-navbar-content">
        <div className="auth-navbar-content__logo">
          <LogoIMG />
        </div>
        <div className="auth-navbar-content__btn-authen">
          <MultiLang />
          <ButtonAuth />
        </div>
      </div>
    </div>
  );
};

export const MultiLang = () => {
  return (
    <div className="navbar-icon-lang">
      <img className="navbar-icon-lang-img" src={IconLang} alt="" />
    </div>
  );
};

export const LogoIMG = () => {
  return (
    <Link to="#" className="navbar-logo">
      <img src={Logo} alt="" className="img" />
      <img src={LogoName} alt="" className="brand" />
    </Link>
  );
};

export const ButtonAuth = () => {
  return (
    <div className="btn-authen">
      <Link to="/login" className="btn-authen-item btn-login">
        <p>Đăng Nhập</p>
      </Link>
      <Link to="/signup" className="btn-authen-item btn-signup">
        <p>Đăng Ký</p>
      </Link>
    </div>
  );
};

export default AuthNavbar;
