import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.scss";

import Logo from "../../../assets/images/logo.svg";
import LogoName from "../../../assets/images/name-lodo.svg";
import IconLang from "../../../assets/icons/icon-lang.svg";

import Searching from "components/Searching/Searching";
import User from "./User/User";

const HomeNabar = () => {
  const userInfo = localStorage.getItem("user");

  return (
    <div className="home-navbar">
      <div className="home-navbar-content">
        <div className="home-navbar-content__logo">
          <LogoIMG />
        </div>
        <div>
          <Searching />
        </div>
        <div className="home-navbar-content__user">
          <div className="">
            <img className="img" src={IconLang} alt="" />
          </div>
          {userInfo ? <User /> : <ButtonAuth />}
        </div>
      </div>
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
    <div className="btn-home">
      <Link to="/login" className="btn-home-item btn-login">
        <p>Đăng Nhập</p>
      </Link>
      <Link to="/signup" className="btn-home-item btn-signup">
        <p>Đăng Ký</p>
      </Link>
    </div>
  );
};

export default HomeNabar;
