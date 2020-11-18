import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { loginRequest } from "api";
import { notice, alert } from "utils/notifications";

const Login = () => {
  const history = useHistory();
  const session = useSelector((state) => state.session);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (session) {
      history.push("/dashboard");
    }
  }, [session, history]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await loginRequest(values);
        setEmailSent(true);
        notice({ message: "Check your inbox to login!" });
      } catch (error) {
        if (
          error &&
          error.errors &&
          error.errors.some((e) => e.code === "REGISTRATION_REQUIRED")
        ) {
          history.push("/signup");
        } else {
          alert({ message: error.errors[0] && error.errors[0].message });
          throw error;
        }
      }
    },
    [history]
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="page">
      <section className="page__section__center">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
        >
          {(props) => (
            <Form className="form">
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <label htmlFor="email">
                <span>Email*: </span>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  disabled={emailSent}
                  onBlur={props.handleBlur}
                />
                {props.touched.email && props.errors.email && (
                  <div className="form__errors">{props.errors.email}</div>
                )}
              </label>
              <button type="submit" disabled={emailSent} className="button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default Login;
