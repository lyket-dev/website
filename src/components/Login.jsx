import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { loginRequest } from "../api";

const Login = () => {
  const history = useHistory();
  const session = useSelector((state) => state.session);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (session) {
      history.push("/user-settings");
    }
  }, [session, history]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await loginRequest(values);
        setEmailSent(true);
      } catch (error) {
        if (error.errors.some((e) => e.code === "REGISTRATION_REQUIRED")) {
          history.push("/signup");
        } else {
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
      <section className="page__section">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          className="form"
        >
          {(props) => (
            <Form>
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <Field type="email" name="email" disabled={emailSent} />
              <button type="submit" disabled={emailSent}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {emailSent && <div>Great, check your inbox to login!</div>}
      </section>
    </div>
  );
};

export default Login;
