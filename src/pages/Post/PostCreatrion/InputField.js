import React from "react";
import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group row">
      <div className="col-sm-1-12">
        <label htmlFor={field.name} className="col-sm-1-12 col-form-label">
          {label}
        </label>
        <input
          className={`form-control 
          ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
          autoComplete="off"
        />
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
};

export default InputField;
