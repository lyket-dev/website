import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Page } from "components/sub/Page";
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
          alert({
            message: error && error.errors[0] && error.errors[0].message,
          });
          throw error;
        }
      }
    },
    [history]
  );

  const initialValues = {
    email: "",
    name: "",
    company: "",
    tech: "",
    allow_list: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    company: Yup.string().max(20, "Must be 20 characters or less"),
    tech: Yup.string().required("Required"),
    allow_list: Yup.string().url("Must be a valid url"),
  });

  return (
    <Page>
      <section className="section">
        <p className="card__bigtext">
          Signup{" "}
          <span aria-label="like" role="img">
            👍
          </span>
          <span aria-label="clap" role="img">
            👏
          </span>
          <span aria-label="Soon" role="img">
            🔜
          </span>
          <span aria-label="Laptop" role="img">
            💻
          </span>
        </p>
        <div className="window">
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
                  <label htmlFor="email">Email*:</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="myemail@example.com"
                    disabled={emailSent}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.email && props.errors.email && (
                  <div className="form__errors">{props.errors.email}</div>
                )}
                <div className="form__row">
                  <label htmlFor="name">Name*: </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    disabled={emailSent}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.name && props.errors.name && (
                  <div className="form__errors">{props.errors.name}</div>
                )}
                <div className="form__row">
                  <label htmlFor="company">Company: </label>
                  <Field
                    id="company"
                    name="company"
                    type="text"
                    onBlur={props.handleBlur}
                    disabled={emailSent}
                  />
                </div>
                {props.touched.company && props.errors.company && (
                  <div className="form__errors">{props.errors.company}</div>
                )}
                <div className="form__row">
                  <label htmlFor="allow_list">Allowed websites: </label>
                  <Field
                    id="allow_list"
                    name="allow_list"
                    type="text"
                    placeholder="https://example.com"
                    onBlur={props.handleBlur}
                    disabled={emailSent}
                  />
                </div>
                {props.touched.allow_list && props.errors.allow_list && (
                  <div className="form__errors">{props.errors.allow_list}</div>
                )}
                <div className="form__row">
                  <label htmlFor="tech">Tech*:</label>
                  <Field
                    type="text"
                    name="tech"
                    id="tech"
                    as="select"
                    onBlur={props.handleBlur}
                    disabled={emailSent}
                  >
                    <option value="">Choose one</option>
                    <option value="react">ReactJS</option>
                    <option value="next">Next.js</option>
                    <option value="gatsby">Gatsby</option>
                    <option value="reactStatic">React Static</option>
                    <option value="html">Simple HTML</option>
                    <option value="wordpress">Wordpress</option>
                    <option value="builder">
                      Website Builder (Webflow, Carrd, Wix, Strikingly...)
                    </option>
                    <option value="VueJS">VueJS</option>
                    <option value="vanilla">Vanilla JS</option>
                    <option value="hexo">Hexo JS</option>
                    <option value="idk">I don't know :)</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
                <div className="center space__top-4">
                  <button type="submit" className="button" disabled={emailSent}>
                    Signup to Lyket!
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Page>
  );
}
