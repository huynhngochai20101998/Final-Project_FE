import React, { useState, useEffect } from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./SignUp.scss";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import RequiredCheck from "./RequiredCheck";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [existUser, setExistUser] = useState([]); // lấy ra mảng user
  const [logError, setLogError] = useState(""); //nếu tồn tại email thông báo email tồn tại, còn không trả về ""
  const [checkClick, setCheckClick] = useState("");
  const errors = "Email đã tồn tại";

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

  function onclickinput() {
    setCheckClick("true");
    setLogError("");
  }

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
          <Form className="container register-form">
            <div className="register-header">
              <h3>ĐĂNG KÝ</h3>
            </div>
            <div className="register-content">
              <div className="row">
                <TextField
                  label="Họ"
                  name="firstName"
                  type="text"
                  className="form-group col-md-6"
                />
                <TextField
                  label="Tên"
                  name="lastName"
                  type="text"
                  className="form-group col-md-6"
                />
              </div>
              <TextField
                label="Email"
                name="email"
                type="email"
                className="form-group"
                errormess={logError}
                onClick={onclickinput}
                checkclick={checkClick}
              />
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
              <RequiredCheck
                name="termsAndConditions"
                label="Tôi đồng ý với các điều khoản và điều kiện"
                className="form-group"
                type="checkbox"
              ></RequiredCheck>
              <div className="col-md-12 text-center">
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
