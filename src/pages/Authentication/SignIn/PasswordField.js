import React, { useState } from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Form } from "formik";
import { FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";

PasswordField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};
PasswordField.defaultProps = {
  type: "password",
  label: "",
  placeholder: "",
  disabled: false
};
function PasswordField(props) {
  const [type, setType] = useState({ hidden: true });
  const { field, form, label, placeholder, disabled } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <Form className="input-field">
      <FormGroup>
        {label && <Label for={name}>{label}</Label>}
        <Input
          id={name}
          {...field}
          type={type ? "password" : "text"}
          disabled={disabled}
          placeholder={placeholder}
          invalid={showError}
        />
        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
      <Button className={name} onClick={() => setType(!type)}>
        {type ? (
          <i className="far fa-eye"></i>
        ) : (
          <i className="far fa-eye-slash"></i>
        )}
      </Button>
    </Form>
  );
}

export default PasswordField;
