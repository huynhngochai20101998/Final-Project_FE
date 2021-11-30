import HomeLayout from "layout/HomeLayout/HomeLayout";
import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

import "./MyProfile.scss";

const MyProfile = () => {
  return (
    <HomeLayout>
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-header">
            <h2 className="profile-header-title no-gutters">
              THÔNG TIN NGƯỜI DÙNG
            </h2>
          </div>
          <div className="profile-body">
            <div className="profile-body-top row g-0">
              <div className="avatar col-sm-4 col-md-4 col-lg-4">
                <div className="avatar-img"></div>
              </div>
              <div className="form col-sm-8 col-md-8 col-lg-8">
                <Form className="form-profile">
                  <FormGroup className="lastname">
                    <Label for="lastName" className="lastname-lable">
                      Họ
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      className="lastName-input"
                      type="text"
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
            <div className="profile-body-bottom row"></div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default MyProfile;
