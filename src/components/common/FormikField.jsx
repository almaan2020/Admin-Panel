import React from "react";
import { Field, ErrorMessage } from "formik";

const FormikField = (props) => {
  const { name, label, type } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="mt-2">
        {label}
      </label>
      <Field name={name} type={type} className="form-control" />
      <ErrorMessage
        name={name}
        component="div"
        className="alert alert-danger"
      />
    </div>
  );
};

export default FormikField;
