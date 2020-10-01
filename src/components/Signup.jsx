import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const handleSubmit = (values) => {
    console.log("submit", values);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password should be longer than 8 characters")
      .required("Required"),
  });

  const initialValues = { email: "", password: "", name: "", company: "" };

  return (
    <div className="page">
      <section className="page__section">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          className="Signup"
        >
          {(props) => (
            <Form>
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <Field type="text" name="company" />
              <Field
                type="email"
                name="email"
                placeholder="admin@example.com"
              />
              <Field type="password" name="password" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default SignUp;
