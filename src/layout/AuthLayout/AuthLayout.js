import React from "react";
import AuthNavbar from "components/Navbar/AuthNavbar/AuthNavbar";
import "./AuthLayout.scss";
import { Col, Row } from "react-bootstrap";
import "./AuthLayout.scss";

const AuthLayout = (props) => {
  return (
    <div className="auth-layout">
      <Row>
        <Col>
          <AuthNavbar />
        </Col>
      </Row>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
