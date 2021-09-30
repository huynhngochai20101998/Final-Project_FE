import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import { FastField, Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonLogin from "components/Button/ButtonLogin/ButtonLogin";
import iconFacebook from "../../../assets/icons/FacebookLogo.svg";
import iconGoogle from "../../../assets/icons/GoogleLogo.svg";

import "./SignUp.scss";
import { FormGroup, Input, Label } from "reactstrap";
import InputField from "../SignIn/InputField";
import PasswordField from "../SignIn/PasswordField";
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Định dạng email không hợp lệ")
      .required("Trường này là bắt buộc."),
    fullname: Yup.string().required("Trường này là bắt buộc. "),
    password: Yup.string()
      .min(5, "Mật khẩu phải có ít nhất 5 ký tự")
      .required("Trường này là bắt buộc. "),
    confirmPassword: Yup.string().required("Trường này là bắt buộc. ")
  });
  return (
    <AuthLayout>
      <div className="Sign-up">
        <Formik
          initialValues={{
            email: "",
            fullname: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
        >
          {() => {
            // do something here
            return (
              <Form className="Sign-up__form">
                <h2>Đăng Kí</h2>
                <FastField
                  name="email"
                  component={InputField}
                  label="Email"
                  placeholder="Ex: example@gmail.com"
                  type="email"
                />
                <FastField
                  name="fullname"
                  component={InputField}
                  label="Họ và tên"
                  placeholder="Ex: Nguyễn Văn A"
                  type="text"
                />
                <FastField
                  name="password"
                  component={PasswordField}
                  label="Mật khẩu"
                  placeholder="********"
                  type="password"
                />
                <FastField
                  name="confirmPassword"
                  component={PasswordField}
                  label="Nhập lại mật khẩu"
                  placeholder="********"
                  type="password"
                />
                <FormGroup check className="Sign-up__form__checkbox">
                  <Label check>
                    <Input type="checkbox" />
                    {""}
                    Tôi đồng ý với điều khoản và điều kiện
                  </Label>
                </FormGroup>

                <div className="form-btn-confirm">
                  <ButtonLogin>Đăng ký</ButtonLogin>
                </div>
                <div className="Sign-up__solid">
                  <span>Hoặc đăng ký với</span>
                </div>
                <div className="Sign-up__google-fb">
                  <button>
                    <img src={iconGoogle}></img>
                    Đăng ký với Google
                  </button>
                  <button>
                    <img src={iconFacebook}></img>
                    Đăng ký với Facebook
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
