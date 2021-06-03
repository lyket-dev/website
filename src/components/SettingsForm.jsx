import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update as updateUser } from "../ducks/currentUser";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Tooltip from "components/Tooltip";
import { notice, alert } from "utils/notifications";

export default function SettingsForm({ onClose }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.currentUser && state.currentUser.attributes;
  });

  const handleSubmit = async (values) => {
    try {
      const newValues = {
        ...values,
        company: values.company || null,
        allow_list: values.allow_list
          ? values.allow_list.split(",").map((e) => e.trim())
          : [],
        max_sessions_per_ip: values.max_sessions_per_ip || null,
        recaptcha_secret: values.recaptcha_secret || null,
      };

      await dispatch(updateUser(newValues));

      notice({ message: "User updated successfully!" });
      onClose();
    } catch (error) {
      alert({
        message: error && error.errors[0] && error.errors[0].message,
      });
    }
  };

  const initialValues = {
    name: currentUser.name,
    company: currentUser.company || "",
    allow_list: currentUser.allow_list.join(", "),
    recaptcha_secret: currentUser.recaptcha_secret || "",
    max_sessions_per_ip: currentUser.max_sessions_per_ip || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(25, "Must be 25 characters or less"),
    company: Yup.string().max(20, "Must be 20 characters or less"),
    recaptcha_secret: Yup.string(),
    allow_list: Yup.string(),
    max_sessions_per_ip: Yup.number()
      .required("Required")
      .min(1, "Must be at least 1"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
    >
      {(props) => (
        <Form className="form">
          <div className="form__row">
            <label htmlFor="name">Name*: </label>
            <Field id="name" name="name" type="text" />
            <Tooltip id="name" message="How you want to be addressed :D" />
          </div>
          {props.touched.name && props.errors.name && (
            <div className="form__errors">{props.errors.name}</div>
          )}
          <div className="form__row">
            <label htmlFor="company">Company: </label>
            <Field id="company" name="company" type="text" />
            <Tooltip id="company" message="The name of your business" />
          </div>
          {props.touched.company && props.errors.company && (
            <div className="form__errors">{props.errors.company}</div>
          )}
          <div className="form__row">
            <label htmlFor="allow_list">Allowed websites:</label>
            <Field
              id="allow_list"
              name="allow_list"
              type="text"
              placeholder="https://example.com, https://another.com"
            />
            <Tooltip
              id="allow-list"
              message="Accept only requests coming from these domains. Separate domains using a comma"
            />
          </div>
          {props.touched.allow_list && props.errors.allow_list && (
            <div className="form__errors">{props.errors.allow_list}</div>
          )}
          <div className="form__row">
            <label htmlFor="recaptcha_secret">reCAPTCHA secret token:</label>
            <Field
              id="recaptcha_secret"
              name="recaptcha_secret"
              type="text"
            ></Field>
            <Tooltip
              id="recaptcha"
              message="To enable ReCAPTCHA insert your secret key here and configure Lyket's Provider in your buttons/script using the ReCAPTCHA site key"
            />
          </div>
          <div className="form__row">
            <label htmlFor="max_sessions_per_ip">Max sessions per IP*:</label>
            <Field
              id="max_sessions_per_ip"
              name="max_sessions_per_ip"
              type="number"
              placeholder="3"
            />
            <Tooltip
              id="form-max-sessions"
              message="Every visitor gets an unique session ID assigned. To avoid misuse we enforce a maximum number of session IDs coming from the same IP."
            />
          </div>
          {props.touched.max_sessions_per_ip &&
            props.errors.max_sessions_per_ip && (
              <div className="form__errors">
                {props.errors.max_sessions_per_ip}
              </div>
            )}
          <div className="flex space__top-4">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="button--cta"
              disabled={!props.dirty}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
