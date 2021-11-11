import React from "react";

import HomeNavbar from "../../components/Navbar/HomeNavbar/HomeNavbar";

import "./HomeLayout.scss";

const HomeLayout = (props) => {
  return (
    <div className="home-layout overflow-auto">
      <div>
        <HomeNavbar />
      </div>
      <div className="home-layout__main ">
        <div className=" auth-layout__main-content">{props.children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
