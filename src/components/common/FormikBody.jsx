import React from "react";
import { Formik, Form } from "formik";

const FormikBody = (props) => {
  const {
    initialValues,
    validationSchema,
    handleForm,
    loading,
    formMsg,
    buttonLabel,
    buttonColor,
    children = null,
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleForm}
      enableReinitialize={true}
    >
      <Form>
        <div>
          {children}

          {formMsg && (
            <div className="form-group">
              <div className="alert alert-info" role="alert">
                {formMsg}
              </div>
            </div>
          )}

          <div className="form-group text-center">
            <button
              type="submit"
              className={`btn btn-${buttonColor} mt-4`}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>{buttonLabel}</span>
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default FormikBody;
