// import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { Formik, Form } from "formik";
import HomeLayout from "layout/HomeLayout/HomeLayout";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { FormGroup, Input, Label } from "reactstrap";
import { updateProfile } from "store/user";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

import "./MyProfile.scss";

const MyProfile = () => {
  const history = useHistory();
  const path = useParams();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState({ email: "" });
  const [profile, setProfile] = useState({
    id: "",
    first_name: "",
    last_name: "",
    birthday: "",
    description: "",
    interests: "",
    gender: "",
    school: "",
    profile_image_url: "",
    avatar: ""
  });
  const [genders, setGenders] = useState(true);
  const [avatar, setAvatar] = useState();
  // const [check, setCheck] = useState(false);

  useEffect(async () => {
    try {
      if (path.id == userInfo.id) {
        const res = await http.get(`/api/profile/user/${path.id}`);
        if (res.success) {
          setEmail({ email: res.data.email });
          setProfile({
            id: res.data.id,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            birthday: res.data.birthday,
            description: res.data.description,
            interests: res.data.interests,
            gender: res.data.gender,
            school: res.data.school,
            avatar: res.data.profile_image_url,
            profile_image_url: res.data.profile_image_url
          });
          setGenders(res.data.gender);
          // setCheck(true);
        }
      }
    } catch (e) {
      console.warn(e.message);
    }
  }, []);

  const validationSchema = Yup.object().shape({});

  return (
    <HomeLayout>
      <div className="profile-wrapper d-flex justify-content-center">
        <div className="profile">
          <div className="profile-header">
            <h2 className="profile-header-title no-gutters">
              THÔNG TIN NGƯỜI DÙNG
            </h2>
          </div>
          <div className="profile-body">
            <Formik
              initialValues={{
                first_name: profile?.first_name || "",
                last_name: profile?.last_name || "",
                birthday: profile?.birthday || "",
                school: profile?.school,
                gender: genders,
                interests: profile?.interests || "",
                description: profile?.description || "",
                avatar: "",
                profile_image_url: ""
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const formatValue = {
                  ...values
                };
                formatValue.id = path.id;
                if (avatar) {
                  formatValue.avatar = avatar;
                } else {
                  formatValue.profile_image_url = profile.profile_image_url;
                }
                formatValue.first_name =
                  formatValue.first_name || profile.first_name;
                formatValue.last_name =
                  formatValue.last_name || profile.last_name;
                formatValue.birthday = formatValue.birthday || profile.birthday;
                formatValue.school = formatValue.school || profile.school;
                formatValue.gender = formatValue.gender || genders;
                formatValue.interests =
                  formatValue.interests || profile?.interests;
                formatValue.description =
                  formatValue.description || profile?.description;

                dispatch(updateProfile(formatValue));
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <div className="profile-body-top row g-0">
                    <div className="avatar col-sm-4 col-md-4 col-lg-4">
                      <div className="avatar-img">
                        <img
                          id="avatar-profile"
                          src={profile.avatar}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%"
                          }}
                        />
                      </div>
                      <div className="avatar-upload">
                        <div className="btn btn-secondary">
                          <input
                            accept="image/*"
                            className="btn-upload"
                            type="file"
                            id="imgInp"
                            onChange={(evt) => {
                              if (evt.target.files.length > 0) {
                                let src = URL.createObjectURL(
                                  evt.target.files[0]
                                );
                                let preview =
                                  document.getElementById("avatar-profile");
                                preview.src = src;
                                preview.style.display = "block";
                                setAvatar(evt.target.files[0]);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form col-sm-8 col-md-8 col-lg-8">
                      <div className="form-profile">
                        <FormGroup className="lastname">
                          <Label for="first_name" className="lastname-lable">
                            Họ
                          </Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            className="lastName-input text-white"
                            type="text"
                            defaultValue={profile.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        <FormGroup className="lastname">
                          <Label for="last_name" className="lastname-lable">
                            Tên
                          </Label>
                          <Input
                            id="last_name"
                            name="last_name"
                            className="lastName-input text-white"
                            type="text"
                            defaultValue={profile.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        <div className="radio-button-gender">
                          <FormGroup check className="radio">
                            <Input
                              name="radio1"
                              type="radio"
                              value="male"
                              className="radio-input"
                              onChange={() => (values.gender = false)}
                              onClick={() => setGenders(false)}
                              checked={genders == true ? false : true}
                            />
                            <Label check>Nam</Label>
                          </FormGroup>
                          <FormGroup check className="radio">
                            <Input
                              name="radio1"
                              type="radio"
                              value="female"
                              className="radio-input"
                              onChange={() => (values.gender = true)}
                              onClick={() => setGenders(true)}
                              checked={genders == true ? true : false}
                            />
                            <Label check>Nữ</Label>
                          </FormGroup>
                        </div>
                        <FormGroup
                          className=" lastname input-school"
                          style={{
                            width: "165px",
                            marginRight: "5px",
                            display: "inline-block"
                          }}
                        >
                          <Label for="birthday" className="lastname-lable">
                            Ngày Sinh
                          </Label>
                          <br />
                          <Input
                            id="birthday"
                            name="birthday"
                            placeholder="date placeholder"
                            type="date"
                            defaultValue={profile.birthday}
                            style={{
                              width: "170px",
                              display: "inline-block"
                            }}
                            className="text-white"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        <FormGroup
                          className=" lastname input-school"
                          style={{
                            width: "345px",
                            marginLeft: "10px",
                            display: "inline-block"
                          }}
                        >
                          <Label for="school" className="lastname-lable">
                            Trường Học
                          </Label>
                          <Input
                            id="school"
                            name="school"
                            className="text-white"
                            type="text"
                            defaultValue={profile.school}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        <FormGroup className="lastname input-full">
                          <Label for="email" className="lastname-lable">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            defaultValue={email.email}
                            className="text-secondary"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                        <FormGroup className="lastname input-full">
                          <Label for="interests" className="lastname-lable">
                            Sở thích
                          </Label>
                          <Input
                            id="interests"
                            name="interests"
                            className="lastName-input text-white"
                            type="text"
                            defaultValue={profile.interests}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="profile-body-bottom row g-0">
                    <FormGroup className="">
                      <Label
                        for="description"
                        className="text-white lable-name"
                      >
                        Giới thiệu
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        className="lastName-input text-white"
                        type="textarea"
                        defaultValue={profile.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </div>
                  <div className="btn-box float-end my-4">
                    <div
                      className="btn btn-secondary mx-4 btn-radius px-4"
                      onClick={() => {
                        history.push(`/personal-info-user/${path.id}`);
                      }}
                    >
                      Thoát
                    </div>
                    <button
                      className="btn btn-radius btn-submit "
                      type="submit"
                    >
                      Cập nhật
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default MyProfile;
