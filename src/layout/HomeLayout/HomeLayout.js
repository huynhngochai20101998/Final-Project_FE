import React from "react";

import HomeNavbar from "../../components/Navbar/HomeNavbar/HomeNavbar";

import "./HomeLayout.scss";

const HomeLayout = (props) => {
  return (
    <div className="home-layout overflow-auto">
      <div className="fixed-top">
        <HomeNavbar />
      </div>
      <div className="home-layout__main">
        <div className=" home-layout__main-content d-flex justify-content-center">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
