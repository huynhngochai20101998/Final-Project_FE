import React from "react";

import "./ButtonLogin.scss";
function ButtonLogin(props) {
  return (
    <button className="btn-login" type="submit">
      {props.children}
    </button>
  );
}

export default ButtonLogin;
