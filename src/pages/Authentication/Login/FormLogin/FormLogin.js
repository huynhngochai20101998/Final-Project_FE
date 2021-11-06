import Loading from "components/Loading/Loading";
// import { USER_ROLE } from "core/constants";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "store/user";
import * as Yup from "yup";

function FormLogin() {
  const isLoading = useSelector((state) => state.user.loading);

  const rememberMe = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe"))
    : null;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: rememberMe?.isRemember ? rememberMe.email : "",
      password: rememberMe?.isRemember ? rememberMe.password : "",
      isRemember: rememberMe?.isRemember ? rememberMe.isRemember : false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Định dạng email không hợp lệ!")
        .required("Trường này là bắt buộc!"),
      password: Yup.string()
        .min(5, "Mật khẩu phải có ít nhất 5 ký tự")
        .required("Trường này là bắt buộc!"),
      isRemember: Yup.bool()
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    }
  });

  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Loading visible={isLoading} />

        <div className="form-group login-form-group ">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="user@email.com"
            name="email"
            value={values.email}
            onChange={formik.handleChange}
          />
        </div>
        {error.email && touched.email && (
          <p className="errors">{error.email}</p>
        )}
        <div className="login-form-group ">
          <label>Mật Khẩu</label>
          <input
            className="input-password form-control"
            type={isShowPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="*****"
            value={values.confirm_password}
            onChange={formik.handleChange}
          />
          <div
            className="show-password"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <i className="far fa-eye icon" />
            ) : (
              <i className="far fa-eye-slash icon" />
            )}
          </div>
        </div>
        {error.password && touched.password && (
          <p className="errors">{error.password}</p>
        )}

        <div className="login-form-group remember-forgot-group">
          <div className="login-form-forgot">
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu
            </Link>
          </div>
        </div>
        <div className="login-form-submit">
          <button className="login-form-submit-btn" type="submit">
            Đăng Nhập
          </button>
        </div>
      </form>
    </>
  );
}

export default FormLogin;
