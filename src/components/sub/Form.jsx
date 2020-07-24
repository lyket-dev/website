import React from "react";
import { Formik, Form } from "formik";

const FormikForm = (other) => (
  <Formik {...other}>
    {({ props, ...other }) => (
      <Form>
        {props.errors && <div>{Object.values(props.errors)}</div>}
        {props.children}
        <button type="submit" disabled={props.isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default FormikForm;
