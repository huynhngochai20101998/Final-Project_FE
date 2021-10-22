import React from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="active-failure"
      ></ErrorMessage>
      <span
        htmlFor={field.name}
        className={
          props.errormess === "Email không tồn tại"
            ? "active-failure"
            : "active-success"
        }
        id="label-error"
      >
        {(props.errormess && props.checkClick) ||
        (props.errormess && field.value !== "")
          ? props.errormess
          : ""}
      </span>
    </div>
  );
}

export default TextField;
