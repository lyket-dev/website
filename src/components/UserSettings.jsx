import React from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import { useDispatch, useSelector } from "react-redux";
import { fetch as fetchCurrentUser } from "../ducks/currentUser";
import { Page, Section } from "components/sub/Page";
import { ReactComponent as Key } from "assets/icons/outline/key.svg";
import { ReactComponent as Mail } from "assets/icons/outline/mail.svg";
import { ReactComponent as Shield } from "assets/icons/outline/shield-check.svg";
import { ReactComponent as Check } from "assets/icons/outline/check.svg";
import { ReactComponent as Copy } from "assets/icons/outline/duplicate.svg";

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

  const {
    email,
    public_token: publicToken,
    recaptcha_active: recaptcha,
    allow_list: allow,
  } = currentUser.attributes;

  const allowList =
    allow.length > 0 ? allow.join(", ") : "All websites allowed";

  return (
    <Page>
      <Section>
        <h3 className="section__title">User settings</h3>
        <div className="cards--center">
          <div className="card">
            <div className="card__label">{email}</div>
            <ul className="menu">
              <li className="menu__item space__bottom-2">
                <Mail />
                <span className="menu__item__label">Email: </span>
                <span>{email}</span>
              </li>
              <li className="menu__item space__bottom-2">
                <Key />
                <span className="menu__item__label">API token: </span>
                <span>{publicToken}</span>
                <button
                  className="menu__item__label"
                  onClick={(e) => {
                    e.preventDefault();

                    navigator.clipboard.writeText(publicToken);
                  }}
                >
                  <Copy />
                </button>
              </li>
              <li className="menu__item space__bottom-2">
                <Check />
                <span className="menu__item__label">Allowed websites: </span>
                <span>{allowList}</span>
              </li>
              <li className="menu__item">
                <Shield />
                <span className="menu__item__label">ReCAPTCHA active: </span>
                <span>{recaptcha ? "true" : "false"}</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </Page>
  );
}
