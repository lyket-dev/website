import React from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import { useDispatch, useSelector } from "react-redux";
import { fetch as fetchCurrentUser } from "../ducks/currentUser";
import { Page } from "components/sub/Page";
// import { Formik, Field, Form } from "formik";

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

  // const handleSubmit = async (values) => {
  //   try {
  //     await dispatch(updateUser(values));
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  if (!currentUser) {
    return null;
  }

  return (
    <Page>
      <section className="page__section__center">
        <h3 className="page__title">User settings</h3>
        <div className="form">
          <label>
            <span>Email </span>
            {currentUser.attributes.email}
          </label>
          <label>
            <span>API token </span>
            {currentUser.attributes.public_token}
          </label>
          <label>
            <span>Allowed websites</span>
            {currentUser.attributes.allow_list.join(", ")}
          </label>
          <label>
            <span>ReCAPTCHA active</span>
            {currentUser.attributes.recaptcha_active ? "true" : "false"}
          </label>
        </div>
      </section>
    </Page>
  );
}
