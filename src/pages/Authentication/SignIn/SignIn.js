import React from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import { FastField, Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import ButtonLogin from "components/Button/ButtonLogin/ButtonLogin";
import iconFacebook from "../../../assets/icons/FacebookLogo.svg";
import iconGoogle from "../../../assets/icons/GoogleLogo.svg";

import "./SignIn.scss";
import PasswordField from "./PasswordField";
const SignIn = () => {
  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Định dạng email không hợp lệ")
    //   .required("Trường này là bắt buộc."),
    // password: Yup.string().required("Trường này là bắt buộc. ")
  });
  return (
    <AuthLayout>
      <div className="Sign-in">
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={validationSchema}
        >
          {() => {
            // do something here
            return (
              <Form className="Sign-in__form">
                <h2>Đăng nhập</h2>
                <FastField
                  name="email"
                  component={InputField}
                  label="Email"
                  placeholder="Ex: example@gmail.com"
                  type="email"
                />
                <FastField
                  name="password"
                  component={PasswordField}
                  label="Mật khẩu"
                  placeholder="********"
                  type="password"
                />
                <div className="Sign-in__option">
                  <div>
                    <p>Chưa có tài khoản?</p>
                    <a href="/#">Đăng kí</a>
                  </div>
                  <div>
                    <a href="/#">Quên mật khẩu</a>
                  </div>
                </div>
                <div className="form-btn-confirm">
                  <ButtonLogin>Đăng nhập</ButtonLogin>
                </div>
                <div className="Sign-in__solid">
                  <span>Hoặc đăng nhập với</span>
                </div>
                <div className="Sign-in__google-fb">
                  <button>
                    <img src={iconGoogle}></img>
                    Đăng nhập với Google
                  </button>
                  <button>
                    <img src={iconFacebook}></img>
                    Đăng nhập với Facebook
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

export default SignIn;
