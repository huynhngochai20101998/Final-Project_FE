import React, { useState, useEffect } from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./ForgotPassword.scss";
import * as Yup from "yup";
import TextField from "./TextField";
import { Form, Formik } from "formik";
import axios from "axios";

const ForgotPassword = () => {
  const [existUser, setExistUser] = useState([]); // lấy ra mảng user
  const [logError, setLogError] = useState(""); //nếu tồn tại email thông báo email tồn tại, còn không trả về ""
  const [checkClick, setCheckClick] = useState("");
  const validate = Yup.object({
    email: Yup.string().email("email không hợp lệ").required("Nhập vào email")
  });

  function handleSubmit(values) {
    console.log(values.email);
    handleExistUser(values);
    if (!handleExistUser(values)) {
      console.log(values);
    }
  }

  function handleExistUser(values) {
    const checkUser = existUser.some((item) => {
      return item.email === values.email;
    });
    if (checkUser) {
      setLogError("Đã gửi email. Vui lòng kiểm tra hòm thư của bạn");
      setCheckClick("");
    } else {
      setLogError("Email không tồn tại");
    }
    return checkUser;
  }

  function onclickinput() {
    setCheckClick("true");
    setLogError("");
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        const listUser = response.data;
        setExistUser(listUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="container forgot-form">
            <div className="forgot-header">
              <h3>Quên mật khẩu</h3>
            </div>
            <div className="forgot-content">
              <div className="row">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  className="form-group"
                  errormess={logError}
                  onClick={onclickinput}
                  checkclick={checkClick}
                />
                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="forgot-button"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
