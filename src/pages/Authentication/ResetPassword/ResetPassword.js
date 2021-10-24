import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import { Formik } from "formik";
import "./ResetPassword.scss";
import * as Yup from "yup";

const ResetPassword = () => {
  const validate = Yup.object({
    newPassword: Yup.string()
      .min(6, "Mật khẩu phải ít nhất có 6 ký tự")
      .required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Mật khẩu phải trùng khớp"
    )
  });
  return (
    <AuthLayout>
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: ""
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <div className="wrap-reset-pass">
            <div className="col-md-3 col-sm-3 m-auto content-reset-pass">
              <h2>Thay đổi mật khẩu</h2>
            </div>
          </div>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
