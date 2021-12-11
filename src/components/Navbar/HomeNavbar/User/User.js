import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/user";
import { useHistory } from "react-router-dom";
import "./User.scss";
import { setLoading } from "store/post";
import http from "core/services/httpService";

const User = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(props.userInfo);

  useEffect(async () => {
    try {
      dispatch(setLoading({ loading: true }));

      const res = await http.get(`/api/profile/user/${props.userInfo.id}`);

      dispatch(setLoading({ loading: false }));

      if (res) {
        setUserInfo(res.data);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }, []);

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
          <img src={userInfo?.profile_image_url} alt="" className="img" />
        </div>
        <div className="name">
          <p>{`${userInfo?.last_name}`}</p>
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
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default User;
