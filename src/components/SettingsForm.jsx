import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update as updateUser } from "../ducks/currentUser";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { notice, alert } from "utils/notifications";
import omit from "object.omit";

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
        max_sessions_per_ip: values.enable_max_sessions
          ? values.max_sessions_per_ip
          : null,
        recaptcha_secret: values.recaptcha_secret || null,
      };

      await dispatch(updateUser(omit(newValues, "enable_max_sessions")));

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
    enable_max_sessions: !!currentUser.max_sessions_per_ip,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(25, "Must be 25 characters or less"),
    company: Yup.string().max(20, "Must be 20 characters or less"),
    recaptcha_secret: Yup.string(),
    allow_list: Yup.string(),
    enable_max_sessions: Yup.boolean(),
    max_sessions_per_ip: Yup.number().when("enable_max_sessions", {
      is: (value) => value === true,
      then: Yup.number()
        .required("If enabled this field is required")
        .min(1, "Must be at least 1"),
      otherwise: Yup.number(),
    }),
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
            <label htmlFor="allow_list">Allowed websites:</label>
            <Field
              id="allow_list"
              name="allow_list"
              type="text"
              placeholder="https://example.com, https://another.com"
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
          </div>
          <div className="form__row">
            <label htmlFor="max_sessions_per_ip">Max sessions per IP:</label>
            <div className="form__row">
              <Field
                id="enable_max_sessions"
                name="enable_max_sessions"
                type="checkbox"
              />
              <Field
                id="max_sessions_per_ip"
                name="max_sessions_per_ip"
                type="number"
                disabled={!props.values.enable_max_sessions && "disabled"}
              />
            </div>
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
