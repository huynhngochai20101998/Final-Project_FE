import AuthLayout from "layout/AuthLayout/AuthLayout";
import React from "react";
import "./ResetPassword.scss";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className="wrap-reset-pass">
        <div className="col-md-3 col-sm-3 m-auto content-reset-pass">
          <h2>Thay đổi mật khẩu</h2>
          <form>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="newpassword"
                className="form-control"
                id="newpassword"
                required
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmpassword"
                className="form-control"
                id="confirmpassword"
                required
              />
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

export default ResetPassword;
