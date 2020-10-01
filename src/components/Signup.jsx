import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { signupRequest } from "../api";
import { notice, alert } from "utils/notifications";

export default function Signup() {
  const history = useHistory();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    if (session) {
      history.push("/user-settings");
    }
  }, [session, history]);

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await signupRequest(values);
        setEmailSent(true);
        notice({ message: "Check your inbox to login!" });
      } catch (error) {
        if (
          error &&
          error.errors &&
          error.errors.some((e) => e.code === "USER_REGISTERED")
        ) {
          history.push("/login");
        } else {
          alert({ message: error.errors[0] && error.errors[0].message });
          throw error;
        }
      }
    },
    [history]
  );

  const initialValues = {
    name: "",
    company: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    company: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <div className="page">
      <section className="page__section">
        <div className="form__wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={true}
            className="form"
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
                <label htmlFor="name">
                  <span>Name*: </span>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    disabled={emailSent}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.name && props.errors.name && (
                    <div className="form__errors">{props.errors.name}</div>
                  )}
                </label>
                <label htmlFor="company">
                  <span>Company*: </span>
                  <Field
                    id="company"
                    name="company"
                    type="text"
                    onBlur={props.handleBlur}
                    disabled={emailSent}
                  />

                  {props.touched.company && props.errors.company && (
                    <div className="form__errors">{props.errors.company}</div>
                  )}
                </label>
                <button type="submit" className="button" disabled={emailSent}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}
