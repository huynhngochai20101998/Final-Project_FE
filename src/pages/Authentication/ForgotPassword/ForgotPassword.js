import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./ForgotPassword.scss";
import { Form, Formik } from "formik";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <Formik>
        {() => (
          <div className="wrap-forgot-pass">
            <div className="col-md-3 col-sm-3 m-auto content-forgot-pass">
              <h2>Quên mật khẩu</h2>
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <button type="submit" className="btn btn-primary float-right">
                  Xác nhận
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
