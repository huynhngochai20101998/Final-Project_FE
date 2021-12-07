import React, { useState } from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./SignUp.scss";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import RequiredCheck from "./RequiredCheck";
// import axios from "axios";
import http from "core/services/httpService";
import { Link } from "react-router-dom";
import { pushToast } from "components/Toast";
import Loading from "components/Loading/Loading";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validate = Yup.object({
    first_name: Yup.string().required("Tên bạn là gì?"),
    last_name: Yup.string().required("Tên bạn là gì?"),
    email: Yup.string().email("email không hợp lệ").required("Nhập vào email"),
    password: Yup.string()
      .min(8, "Mật khẩu ít nhất 8 ký tự")
      .required("Nhập vào mật khẩu"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận lại mật khẩu của bạn"),
    termsAndConditions: Yup.bool().oneOf([true], "Yêu cầu chấp nhận điều khoản")
  });

  function handleSubmit(values) {
    setIsLoading(true);
    const { termsAndConditions, ...dataUser } = values;
    console.log(termsAndConditions);
    http
      .post("/api/register", dataUser)
      .then(() => {
        setIsLoading(false);
        pushToast("info", "kiểm tra email của bạn");
      })
      .catch((error) => {
        setIsLoading(false);
        error;
        pushToast("error", "Email này đã tồn tại");
      });
  }

  return (
    <AuthLayout>
      <Loading visible={isLoading} />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          termsAndConditions: false
        }}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="container register-form">
            <div className="register-header">
              <h3>ĐĂNG KÝ</h3>
            </div>
            <div className="register-content">
              <div className="row">
                <TextField
                  label="Họ"
                  name="first_name"
                  type="text"
                  className="form-group col-md-6"
                />
                <TextField
                  label="Tên"
                  name="last_name"
                  type="text"
                  className="form-group col-md-6"
                />
              </div>
              <TextField
                label="Email"
                name="email"
                type="email"
                className="form-group"
              />
              <TextField
                label="Mật Khẩu"
                name="password"
                type="password"
                className="form-group"
              />
              <TextField
                label="Xác Nhận Mật Khẩu"
                name="password_confirmation"
                type="password"
                className="form-group"
              />
              <RequiredCheck
                name="termsAndConditions"
                label="Tôi đồng ý với các điều khoản và điều kiện"
                className="form-group check-term"
                type="checkbox"
              ></RequiredCheck>
              <div className="col-md-12 text-center form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="register-button"
                >
                  Đăng ký
                </button>
              </div>
              <div className="register-bottom">
                <span>Đã có tài khoản?</span>
                <Link to="/login" className="link-sign-in">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
