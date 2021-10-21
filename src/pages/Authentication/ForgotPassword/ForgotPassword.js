import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./ForgotPassword.scss";
import * as Yup from "yup";
import TextField from "./TextField";
import { Form, Formik } from "formik";

const ForgotPassword = () => {
  const validate = Yup.object({
    email: Yup.string().email("email không hợp lệ").required("Nhập vào email")
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
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
