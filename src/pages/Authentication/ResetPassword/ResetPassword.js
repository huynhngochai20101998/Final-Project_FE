import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import { Formik } from "formik";
import "./ResetPassword.scss";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const history = useHistory();
  const validate = Yup.object({
    password: Yup.string()
      .min(5, "Mật khẩu ít nhất 5 ký tự")
      .required("Nhập vào mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận lại mật khẩu của bạn")
  });

  function handleSubmit(values) {
    console.log(values);
    axios
      .put("http://localhost:3000/user/1", values)
      .then((response) => {
        console.log(response);
        history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: ""
        }}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="container reset-form">
            <div className="reset-header">
              <h3>ĐỔI MẬT KHẨU</h3>
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
