import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createSession } from "../ducks/session";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await dispatch(createSession(values));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.mixed().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="Page">
      <h1>Work in progres...</h1>
      {false && (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
        >
          {(props) => (
            <Form>
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <Field type="email" name="email" />
              <Field type="password" name="password" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Login;
