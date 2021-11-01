import React from "react";
import { Col, Row } from "react-bootstrap";

import {
  VisitorNavbar,
  UserNabar
} from "../../components/Navbar/HomeNavbar/HomeNavbar";

export const HomeVisitorLayout = (props) => {
  return (
    <div className="">
      <Row>
        <Col>
          <VisitorNavbar />
        </Col>
      </Row>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </div>
  );
};

export const HomeUserLayout = (props) => {
  return (
    <div className="">
      <Row>
        <Col>
          <UserNabar />
        </Col>
      </Row>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </div>
  );
};
