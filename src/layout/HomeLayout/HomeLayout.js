import React from "react";
import { Col, Row } from "react-bootstrap";

import HomeNavbar from "../../components/Navbar/HomeNavbar/HomeNavbar";

import "./HomeLayout";

const HomeLayout = (props) => {
  return (
    <div className="home-layout">
      <Row>
        <Col>
          <HomeNavbar />
        </Col>
      </Row>
      <Row className="auth-layout__main">
        <Col lassName="auth-layout__main-content">{props.children}</Col>
      </Row>
    </div>
  );
};

export default HomeLayout;
