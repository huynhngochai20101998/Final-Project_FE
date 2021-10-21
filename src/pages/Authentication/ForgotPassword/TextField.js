import React from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${className} ${meta.touched && meta.error && "is-invalid"}`}
    >
      <div className="form-check">
        <input className="form-check-input" {...field} {...props} />
        <label className="form-check-label" htmlFor={field.name}>
          {label}
        </label>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
}

export default TextField;
