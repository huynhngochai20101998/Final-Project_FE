import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, className, type, ...props }) {
  const [field, meta] = useField(props);
  const [isShowPassword, setIsShowPassword] = useState("");

  return (
    <div className={className}>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control ${meta.touched && meta.error} ${
          type === "password" ? "password" : ""
        }`}
        type={isShowPassword ? "text" : type}
        {...field}
        {...props}
        autoComplete="off"
      />
      {type === "password" ? (
        <div
          className="show-password"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? (
            <i className="far fa-eye" />
          ) : (
            <i className="far fa-eye-slash" />
          )}
        </div>
      ) : (
        ""
      )}
      <ErrorMessage
        component="div"
        name={field.name}
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
}

export default TextField;
