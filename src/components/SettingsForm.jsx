import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update as updateUser } from "../ducks/currentUser";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { notice, alert } from "utils/notifications";

export default function SettingsForm({ onClose }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.currentUser && state.currentUser.attributes;
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateUser(values));
      notice({ message: "User updated successfully!" });
    } catch (error) {
      console.error(error);
      alert({
        message: error && error.errors[0] && error.errors[0].message,
      });
      throw error;
    }
  };

  const initialValues = {
    name: currentUser.name,
    company: currentUser.company,
    website: currentUser.allow_list,
    recaptchaToken: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(25, "Must be 25 characters or less"),
    company: Yup.string().max(20, "Must be 20 characters or less"),
    recaptchaToken: Yup.string().required("Required"),
    website: Yup.string().url("Must be a valid url"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      className="form"
    >
      {(props) => (
        <Form className="form">
          <div className="form__row">
            <label htmlFor="name">Name*: </label>
            <Field id="name" name="name" type="text" />
          </div>
          {props.touched.name && props.errors.name && (
            <div className="form__errors">{props.errors.name}</div>
          )}
          <div className="form__row">
            <label htmlFor="company">Company: </label>
            <Field id="company" name="company" type="text" />
          </div>
          {props.touched.company && props.errors.company && (
            <div className="form__errors">{props.errors.company}</div>
          )}
          <div className="form__row">
            <label htmlFor="website">Website:</label>
            <Field
              id="website"
              name="website"
              type="text"
              placeholder="https://example.com"
            />
          </div>
          {props.touched.website && props.errors.website && (
            <div className="form__errors">{props.errors.website}</div>
          )}
          <div className="form__row">
            <label htmlFor="recaptchaToken">Recaptcha secret token:</label>
            <Field
              id="recaptchaToken"
              name="recaptchaToken"
              type="text"
            ></Field>
          </div>
          <div className="flex">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
