import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./ForgotPassword.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { forgotPass } from "store/user";
import { Form } from "reactstrap";
import Loading from "components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const isLoading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Định dạng email không hợp lệ!")
        .required("Trường này là bắt buộc!")
    }),
    onSubmit: (values) => {
      dispatch(forgotPass(values));
    }
  });

  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;

  return (
    <AuthLayout>
      <Form className="container forgot-form" onSubmit={formik.handleSubmit}>
        <Loading visible={isLoading} />
        <div className="forgot-header">
          <h3>Quên mật khẩu</h3>
        </div>
        <div className="forgot-content">
          <div className="row">
            <label className="name-input">Email</label>
            <input
              name="email"
              type="email"
              className="form-group"
              value={values.email}
              onChange={formik.handleChange}
            />
            {error.email && touched.email && (
              <p className="errors">{error.email}</p>
            )}
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
    </AuthLayout>
  );
};

export default ForgotPassword;
