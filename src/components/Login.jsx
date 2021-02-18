import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Page, Section } from "components/sub/Page";
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
    <Page>
      <Section>
        <h3 className="section__title">Lyket Login</h3>
        <div className="window">
          <div className="window__text">
            Enter your email and we will send you a Magic Link to your inbox.
            Click on it to login!
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={true}
          >
            {(props) => (
              <Form className="form">
                <div className="form__row">
                  <label htmlFor="email">Email*: </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    disabled={emailSent}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.email && props.errors.email && (
                  <div className="form__errors">{props.errors.email}</div>
                )}
                <button type="submit" disabled={emailSent} className="button">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Section>
    </Page>
  );
};

export default Login;
