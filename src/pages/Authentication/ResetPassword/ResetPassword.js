import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import { Formik } from "formik";
import "./ResetPassword.scss";
import TextField from "./TextField";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <Formik>
        {(formik) => (
          <div className="wrap-reset-pass">
            {console.log(formik)}
            <div className="col-md-3 col-sm-3 m-auto content-reset-pass">
              <h2>Thay đổi mật khẩu</h2>
              <form>
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <TextField></TextField>
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu</label>
                  <TextField></TextField>
                </div>
                <button type="submit" className="btn btn-primary float-right">
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
