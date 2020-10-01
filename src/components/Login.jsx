import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { createSession } from "../ducks/session";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    if (session) {
      history.push("/user-settings");
    }
  }, [session]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(createSession(values));
      history.push("/user-settings");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.mixed().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="page">
      <section className="page__section">
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
      </section>
    </div>
  );
};

export default Login;
