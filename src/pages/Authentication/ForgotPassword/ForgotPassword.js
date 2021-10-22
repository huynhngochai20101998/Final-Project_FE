import React, { useEffect, useState } from "react";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./ForgotPassword.scss";
import validator from "validator";

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState({
    text: "Nhập vào email đã đăng ký",
    errorCheck: 0
  });

  useEffect(() => {
    var ElementEmailHelp = document.querySelector("#emailHelp");
    if (emailError.checkError === 1) {
      ElementEmailHelp.classList.add("active-success");
      ElementEmailHelp.classList.remove("active-failure");
    } else if (emailError.checkError === -1) {
      ElementEmailHelp.classList.add("active-failure");
      ElementEmailHelp.classList.remove("active-success");
    }
  }, [emailError.checkError]);

  function validateEmail(e) {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError((previous) => {
        return {
          ...previous,
          text: "Email hợp lệ!",
          checkError: 1
        };
      });
    } else {
      setEmailError((previous) => {
        return {
          ...previous,
          text: "Email không hợp lệ!",
          checkError: -1
        };
      });
    }
  }

  return (
    <AuthLayout>
      <div className="wrap-forgot-pass">
        <div className="col-md-3 col-sm-3 m-auto content-forgot-pass">
          <h2>Quên mật khẩu</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={(e) => validateEmail(e)}
                required
              />
              <small id="emailHelp" className="form-text">
                {emailError.text}
              </small>
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
