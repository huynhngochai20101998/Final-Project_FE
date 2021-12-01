import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.scss";

import Logo from "../../../assets/images/logo.svg";
import LogoName from "../../../assets/images/name-lodo.svg";
import IconLang from "../../../assets/icons/icon-lang.svg";
import avatar from "../../../assets/images/user-avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import Searching from "components/Searching/Searching";
import { useHistory } from "react-router-dom";
const HomeNabar = () => {
  const userInfo = localStorage.getItem("user");
  const dispatch = useDispatch();
  const history = useHistory();
  const handelLogout = () => {
    console.log("alo");
    dispatch(logout());
  };

  const handleToPersonalUser = () => {
    const localUserID = JSON.parse(localStorage.getItem("user")).id;
    history.push(`/personal-info-user/${localUserID}`);
  };

  const handleToChangePassword = () => {
    history.push(`/reset-password`);
  };

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
          {userInfo ? (
            <div className="home-user">
              <div className="home-user__content">
                <div className="user-img">
                  <img src={avatar} alt="" className="img" />
                </div>
                <div className="name">
                  <p>Dung</p>
                </div>
              </div>
              <ul className="control">
                <li className="control-item" onClick={handleToPersonalUser}>
                  Trang cá nhân
                </li>
                <li className="control-item" onClick={handleToChangePassword}>
                  Đổi mật khẩu
                </li>
                <li className="control-item" onClick={handelLogout}>
                  logout
                </li>
              </ul>
            </div>
          ) : (
            <ButtonAuth />
          )}
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
