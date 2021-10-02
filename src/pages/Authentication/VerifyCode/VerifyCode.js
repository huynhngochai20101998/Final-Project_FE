import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import * as Yup from "yup";
import { FastField, Formik } from "formik";
import { Form, Label } from "reactstrap";
import InputField from "../SignIn/InputField";
import ButtonLogin from "components/Button/ButtonLogin/ButtonLogin";

import "./VerifyCode.scss";
const VerifyCode = () => {
  const validationSchema = Yup.object().shape({
    verify: Yup.string().required("Trường này là bắt buộc.")
  });
  return (
    <AuthLayout>
      <div className="Verify">
        <Formik
          initialValues={{
            verify: ""
          }}
          validationSchema={validationSchema}
        >
          {() => {
            // do something here
            return (
              <Form className="Verify__form">
                <h2>Xác nhận</h2>
                <FastField
                  name="verify"
                  component={InputField}
                  label="Mã xác nhận"
                  placeholder=""
                  type="text"
                />
                <Label className="Verify__form__resend">
                  Chưa nhận được mã xác nhận ?<a href=""> Gửi lại</a>
                </Label>
                <div className="form-btn-confirm">
                  <ButtonLogin>Xác nhận</ButtonLogin>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default VerifyCode;
