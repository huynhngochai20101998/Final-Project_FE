import React from "react";
import avatar from "../../../../assets/images/user-avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import { useHistory } from "react-router-dom";
import "./User.scss";

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleToPersonalUser = () => {
    const localUserID = JSON.parse(localStorage.getItem("user")).id;
    history.push(`/personal-info-user/${localUserID}`);
  };

  const handleToChangePassword = () => {
    history.push(`/reset-password`);
  };

  const handelLogout = () => {
    dispatch(logout());
  };

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
  );
};

export default User;
