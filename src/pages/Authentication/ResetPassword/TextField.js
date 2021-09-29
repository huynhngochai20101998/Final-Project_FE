import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
};

export default TextField;
