import React, { useState } from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import { useDispatch, useSelector } from "react-redux";
import { fetch as fetchCurrentUser } from "../ducks/currentUser";
import SettingsForm from "./SettingsForm";
import { Page, Section } from "components/sub/Page";
import { ReactComponent as Key } from "assets/icons/outline/key.svg";
import { ReactComponent as Mail } from "assets/icons/outline/mail.svg";
import { ReactComponent as Shield } from "assets/icons/outline/shield-check.svg";
import { ReactComponent as Check } from "assets/icons/outline/check.svg";
import { ReactComponent as Copy } from "assets/icons/outline/duplicate.svg";

export default function UserSettings() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const currentUser = useSelector((state) => {
    return state.currentUser;
  });

  useAsyncEffect(async () => {
    if (currentUser) {
      return;
    }

    await dispatch(fetchCurrentUser());
  }, []);

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

  const renderMenu = () => {
    return (
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
        <li className="menu__item space__bottom-2">
          <Shield />
          <span className="menu__item__label">ReCAPTCHA active: </span>
          <span>{recaptcha ? "true" : "false"}</span>
        </li>
      </ul>
    );
  };

  return (
    <Page>
      <Section>
        <h3 className="section__title">User settings</h3>
        <div className="window space__bottom-6">
          <div className="window__label">{email}</div>
          {!editMode && renderMenu()}
          {editMode && <SettingsForm onClose={() => setEditMode(false)} />}
        </div>
      </Section>
      <Section>
        <h3 className="section__title">What to do now?</h3>
        <div className="cards--multi">
          <div className="card">
            <div className="card__label">React</div>
            <p className="card__text">
              If you use React you can install our library
            </p>
            <code>
              <pre>npm install @lyket/react</pre>
            </code>
            <code>
              <pre>yarn add @lyket/react</pre>
            </code>
            <p className="card__text">
              Copy your API key to configure the Provider top-level
            </p>
            <code>
              <pre>{`import { Provider } from '@lyket/react';

ReactDOM.render(
  <Provider apiKey="${publicToken}">
    <App />
  </Provider>,
  document.getElementById('root')
);`}</pre>
            </code>
            <span>Follow the </span>
            <a
              href="https://lyket.dev/docs/react"
              target="_blank"
              rel="noopener noreferrer"
            >
              official React documentation
            </a>
            <span> to start creating buttons</span>
          </div>
          <div className="card">
            <div className="card__label">HTML</div>
            <p className="card__text">
              If you want to use our HTML embeddable widget you can do it by
              importing Lyket top-level providing your API key
            </p>
            <code>
              <pre>{`<script src="https://unpkg.com/@lyket/widget@latest/dist/lyket.js?apiKey=${publicToken}"></script>
`}</pre>
            </code>
            <div className="card__text">
              <span>Follow the </span>
              <a
                href="https://lyket.dev/docs/widget"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Widget documentation
              </a>
              <span> to start creating buttons</span>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
