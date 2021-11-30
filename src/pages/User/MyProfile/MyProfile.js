import HomeLayout from "layout/HomeLayout/HomeLayout";
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
            <Form>
              <div className="profile-body-top row g-0">
                <div className="avatar col-sm-4 col-md-4 col-lg-4">
                  <div className="avatar-img"></div>
                  <div className="avatar-upload">
                    <div className="btn btn-secondary">
                      <i className="fas fa-camera mx-2" />
                      Chọn tệp
                    </div>
                  </div>
                </div>
                <div className="form col-sm-8 col-md-8 col-lg-8">
                  <div className="form-profile">
                    <FormGroup className="lastname">
                      <Label for="lastName" className="lastname-lable">
                        Họ
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        className="lastName-input text-white"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className="lastname">
                      <Label for="lastName" className="lastname-lable">
                        Tên
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        className="lastName-input text-white"
                        type="text"
                      />
                    </FormGroup>
                    <div className="radio-button-gender">
                      <FormGroup check className="radio">
                        <Input
                          name="radio1"
                          type="radio"
                          value="male"
                          className="radio-input"
                        />
                        <Label check>Nam</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input
                          name="radio1"
                          type="radio"
                          value="female"
                          className="radio-input"
                        />
                        <Label check>Nữ</Label>
                      </FormGroup>
                    </div>
                    <FormGroup className="lastname">
                      <Label for="birthday" className="lastname-lable">
                        Ngày Sinh
                      </Label>
                      <Input
                        id="birthday"
                        name="birthday"
                        className="lastName-input text-white"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className=" lastname input-univer">
                      <Label for="university" className="lastname-lable">
                        Trường Học
                      </Label>
                      <Input
                        id="university"
                        name="university"
                        className="text-white"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className="lastname input-full">
                      <Label for="email" className="lastname-lable">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        className="text-secondary"
                        value="huynhngochai@gmail.com"
                        type="email"
                        disabled
                      />
                    </FormGroup>
                    <FormGroup className="lastname input-full">
                      <Label for="interest" className="lastname-lable">
                        Sở thích
                      </Label>
                      <Input
                        id="interest"
                        name="interest"
                        className="lastName-input text-white"
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="profile-body-bottom row g-0">
                <FormGroup className="">
                  <Label for="intro" className="text-white lable-name">
                    Giới thiệu
                  </Label>
                  <Input
                    id="intro"
                    name="intro"
                    className="lastName-input text-white"
                    type="textarea"
                  />
                </FormGroup>
              </div>
              <div className="btn-box float-end my-4">
                <div className="btn btn-secondary mx-4 px-4">Thoát</div>
                <Button className="btn btn-info">Cập nhật</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default MyProfile;
