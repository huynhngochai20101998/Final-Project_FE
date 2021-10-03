import React from "react";
import { ErrorMessage, useField } from "formik";

const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group row">
      <div className="col-sm-1-12">
        <label htmlFor={field.name} className="col-sm-1-12 col-form-label">
          {label}
        </label>
        <textarea
          className={`form-control 
          ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
          autoComplete="off"
        ></textarea>
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
};

export default TextAreaField;
