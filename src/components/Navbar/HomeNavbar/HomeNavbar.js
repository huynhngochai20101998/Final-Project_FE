import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.scss";

import Logo from "../../../assets/images/logo.svg";
import LogoName from "../../../assets/images/name-lodo.svg";
import IconLang from "../../../assets/icons/icon-lang.svg";
import avatar from "../../../assets/images/user-avatar.png";

const HomeNabar = () => {
  // const userInfo = localStorage.getItem("user");
  const userInfo = true;

  return (
    <div className="home-navbar">
      <div className="home-navbar-content">
        <div className="home-navbar-content__logo">
          <LogoIMG />
        </div>
        <div className="home-navbar-content__btn-home">
          <div className="">
            <img className="img" src={IconLang} alt="" />
            <ul className="language-list">
              <li className="language-item">EN</li>
              <li className="language-item">VN</li>
            </ul>
          </div>
          {userInfo ? <UserNav /> : <ButtonAuth />}
        </div>
      </div>
    </div>
  );
};

export const UserNav = () => {
  return (
    <div className="home-user">
      <div className="home-user__content">
        <div className="user-img">
          <img src={avatar} alt="" className="img" />
        </div>
        <div className="name">
          <p>Dung</p>
        </div>
      </div>
      <div className="home-user__control"></div>
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
