import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, className, ...props }) {
  const [field, meta] = useField(props);
  const [checkClick, setCheckClick] = useState(false);

  function onClick() {
    setCheckClick(true);
  }

  function onBlur() {
    setCheckClick(false);
  }

  return (
    <div className={className}>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        onClick={onClick}
        onBlur={onBlur}
      />
      <span htmlFor={field.name} className="active-failure" id="label-error">
        {props.errormess && !checkClick && field.value !== ""
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
