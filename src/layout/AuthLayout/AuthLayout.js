import React from "react";
import AuthNavbar from "components/Navbar/AuthNavbar/AuthNavbar";
import "./AuthLayout.scss";

import "./AuthLayout.scss";

const AuthLayout = (props) => {
  return (
    <div className="auth-layout overflow-auto">
      <div className="fixed-top">
        <AuthNavbar />
      </div>
      <div className="auth-layout__main">
        <div className="auth-layout__main-content">{props.children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
