import React, { useState, useEffect } from "react";
import Form from "./sub/Form";
import { Field } from "formik";
import * as Yup from "yup";

const Login = () => {
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
    <div className="Page">
      <h1>Sign up!</h1>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        className="Form"
      >
        <Field type="text" name="name" />
        <Field type="text" name="company" />
        <Field type="email" name="email" placeholder="admin@example.com" />
        <Field type="password" name="password" />
      </Form>
    </div>
  );
};

export default Login;
