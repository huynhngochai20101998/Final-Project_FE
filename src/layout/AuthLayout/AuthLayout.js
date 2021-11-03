import React from "react";
import AuthNavbar from "components/Navbar/AuthNavbar/AuthNavbar";
import "./AuthLayout.scss";
import { Col, Row } from "reactstrap";

import "./AuthLayout.scss";

const AuthLayout = (props) => {
  return (
    <div className="auth-layout">
      <Row>
        <Col>
          <AuthNavbar />
        </Col>
      </Row>
      <Row className="auth-layout__main">
        <Col className="auth-layout__main-content">{props.children}</Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
