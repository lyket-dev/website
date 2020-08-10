import React from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch as fetchCurrentUser,
  update as updateUser,
} from "../ducks/currentUser";
import { Formik, Field, Form } from "formik";

export default function UserSettings() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.currentUser;
  });

  useAsyncEffect(async () => {
    if (currentUser) {
      return;
    }

    await dispatch(fetchCurrentUser());
  }, []);

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateUser(values));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  if (!currentUser) {
    return <div className="Page">Non trovo lo user </div>;
  }

  return (
    <div className="Page">
      {currentUser.attributes.email}
      <Formik
        initialValues={{ recaptchaToken: "" }}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {(props) => (
          <Form>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <Field type="text" name="recaptchaToken" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
