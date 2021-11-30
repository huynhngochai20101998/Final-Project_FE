import React from "react";
import avatar from "../../../../assets/images/user-avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import "./User.scss";

const User = () => {
  const dispatch = useDispatch();

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
        <li className="control-item" onClick={handelLogout}>
          logout
        </li>
      </ul>
    </div>
  );
};

export default User;
