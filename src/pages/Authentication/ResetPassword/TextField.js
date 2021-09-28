import React from "react";
import "./ResetPassword.scss";

const TextField = () => {
  return (
    <div>
      <input
        type="password"
        name="newpassword"
        className="form-control"
        id="newpassword"
        required
      />
    </div>
  );
};

export default TextField;
