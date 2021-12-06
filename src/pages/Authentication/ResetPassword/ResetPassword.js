import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import { useFormik } from "formik";
import "./ResetPassword.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, changePassword } from "store/user";
import Loading from "components/Loading/Loading";
import { Form } from "reactstrap";
import { useLocation } from "react-router";
import { ref } from "yup";

const ResetPassword = () => {
  const isLoading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const { search } = useLocation();

  const token = new URLSearchParams(search).get("token");
  const getUser = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : "";

  const formik = useFormik({
    initialValues: {
      token: token,
      oldPassword: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 ký tự")
        .required("Nhập vào mật khẩu"),
      confirmPassword: Yup.string()
        .oneOf([ref("password")], "Mật khẩu không khớp")
        .required("Xác nhận lại mật khẩu của bạn")
    }),
    onSubmit: (values) => {
      if (getUser) {
        dispatch(changePassword(values));
      } else {
        dispatch(resetPassword(values));
      }
    }
  });

  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;
  console.log(values);

  return (
    <AuthLayout>
      <Form className="reset-form" onSubmit={formik.handleSubmit}>
        <Loading visible={isLoading} />
        <div className="reset-header">
          <h3>ĐỔI MẬT KHẨU</h3>
        </div>
        <div className="reset-content">
          {getUser ? (
            <div className="row">
              <label className="name-input">Mật khẩu cũ</label>
              <input
                name="oldPassword"
                type="password"
                className="form-group"
                value={values.oldPassword}
                onChange={formik.handleChange}
              />
              {error.password && touched.password && (
                <p className="errors">{error.password}</p>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <label className="name-input">Mật khẩu mới</label>
            <input
              name="password"
              type="password"
              className="form-group"
              value={values.password}
              onChange={formik.handleChange}
            />
            {error.password && touched.password && (
              <p className="errors">{error.password}</p>
            )}
          </div>
          <div className="row">
            <label className="name-input">Xác nhận mật khẩu</label>
            <input
              name="confirmPassword"
              type="password"
              className="form-group"
              value={values.confirmPassword}
              onChange={formik.handleChange}
            />
            {error.confirmPassword && touched.confirmPassword && (
              <p className="errors">{error.confirmPassword}</p>
            )}
          </div>

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
    </AuthLayout>
  );
};

export default ResetPassword;
