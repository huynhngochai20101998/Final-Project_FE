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
      <span htmlFor={field.name} className="active-failure" id="label-error">
        {(props.errormess && props.checkClick) ||
        (props.errormess && field.value !== "")
          ? props.errormess
          : ""}
      </span>
      <ErrorMessage
        component="div"
        name={field.name}
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
}

export default TextField;
