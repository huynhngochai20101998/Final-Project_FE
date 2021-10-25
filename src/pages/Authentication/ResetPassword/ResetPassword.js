import AuthLayout from "layout/AuthLayout/AuthLayout";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import "./ResetPassword.scss";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const history = useHistory();
  const [existUser, setExistUser] = useState([]); // lấy ra mảng user
  const [logError, setLogError] = useState(""); //nếu tồn tại email thông báo email tồn tại, còn không trả về ""
  const [checkClick, setCheckClick] = useState("");
  const errors = "Email đã tồn tại";
  console.log(logError, checkClick);
  const validate = Yup.object({
    firstName: Yup.string().required("Tên bạn là gì?"),
    lastName: Yup.string().required("Tên bạn là gì?"),
    email: Yup.string().email("email không hợp lệ").required("Nhập vào email"),
    password: Yup.string()
      .min(5, "Mật khẩu ít nhất 5 ký tự")
      .required("Nhập vào mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận lại mật khẩu của bạn"),
    termsAndConditions: Yup.bool().oneOf([true], "Yêu cầu chấp nhận điều khoản")
  });

  function handleSubmit(values) {
    handleExistUser(values);
    if (!handleExistUser(values)) {
      const { termsAndConditions, ...dataUser } = values;
      console.log(termsAndConditions);
      axios
        .post("http://localhost:3000/user", dataUser)
        .then((response) => {
          console.log(response);
          history.push("/signin");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleExistUser(values) {
    const checkUser = existUser.some((item) => {
      return item.email === values.email;
    });
    if (checkUser) {
      setLogError(errors);
      setCheckClick("");
    } else {
      setLogError("");
    }
    return checkUser;
  }

  // function onclickinput() {
  //   setCheckClick("true");
  //   setLogError("");
  // }

  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
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
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAndConditions: false
        }}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="container reset-form">
            <div className="reset-header">
              <h3>ĐĂNG KÝ</h3>
            </div>
            <div className="reset-content">
              <TextField
                label="Mật Khẩu"
                name="password"
                type="password"
                className="form-group"
              />
              <TextField
                label="Xác Nhận Mật Khẩu"
                name="confirmPassword"
                type="password"
                className="form-group"
              />
              <div className="col-md-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="register-button"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
