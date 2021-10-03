import React from "react";
import Select from "react-select";
import { ErrorMessage, useField } from "formik";

const SelectField = ({ label, options, onChange, value, ...props }) => {
  const [field, meta] = useField(props);
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className="form-group row">
      <div className="col-sm-1-12">
        <label htmlFor={field.name} className="col-sm-1-12 col-form-label">
          {label}
        </label>
        <Select
          className={`multi-select
          ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
          options={options}
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          isMulti
        ></Select>
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="active-failure"
      ></ErrorMessage>
    </div>
  );
};

export default SelectField;
