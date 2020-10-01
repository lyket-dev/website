import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupRequest } from "../api";

export default function Signup() {
  const history = useHistory();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    if (session) {
      history.push("/user-settings");
    }
  }, [session, history]);

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = useCallback(async (values) => {
    try {
      await signupRequest(values);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      company: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="page">
      <section className="page__section">
        <form onSubmit={formik.handleSubmit} className="form">
          <label htmlFor="email">
            <span>Email*: </span>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </label>
          <label htmlFor="name">
            <span>Name*: </span>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </label>
          <label htmlFor="company">
            <span>Company*: </span>
            <input
              id="company"
              name="company"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
            />

            {formik.touched.company && formik.errors.company ? (
              <div>{formik.errors.company}</div>
            ) : null}
          </label>
          <button type="submit" className="button">
            Submit
          </button>
          <div className="space--bottom-2" />
          <span>Do you already have an account? Go to </span>
          <Link to="/login">login</Link>
        </form>
        {emailSent && <div>Great, check your inbox to login!</div>}
      </section>
    </div>
  );
}
