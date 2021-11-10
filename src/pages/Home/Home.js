import React from "react";

import "./Home.scss";

import HomeLayout from "layout/HomeLayout/HomeLayout";
import { useDispatch } from "react-redux";
import { logout } from "store/user";

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HomeLayout>
      <div>Home visitor</div>
      <button onChange={handleLogout()}>logout</button>
    </HomeLayout>
  );
};

export default Home;
