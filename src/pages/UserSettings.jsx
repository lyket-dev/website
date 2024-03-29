import React, { useState } from 'react';
import useAsyncEffect from 'utils/useAsyncEffect';
import { useDispatch, useSelector } from 'react-redux';
import { fetch as fetchCurrentUser } from 'ducks/currentUser';
import SettingsForm from 'components/SettingsForm';
import Tooltip from 'components/Tooltip';
import { Page, Section } from 'components/Page';
import { ReactComponent as Key } from 'assets/icons/outline/key.svg';
import { ReactComponent as Mail } from 'assets/icons/outline/mail.svg';
import { ReactComponent as Shield } from 'assets/icons/outline/shield-check.svg';
import { ReactComponent as Check } from 'assets/icons/outline/badge-check.svg';
import { ReactComponent as Copy } from 'assets/icons/outline/duplicate.svg';
import { ReactComponent as User } from 'assets/icons/outline/identification.svg';
import { ReactComponent as Building } from 'assets/icons/outline/office-building.svg';
import { ReactComponent as Finger } from 'assets/icons/outline/finger-print.svg';
import { ReactComponent as Eye } from 'assets/icons/outline/eye.svg';
import { ReactComponent as EyeClosed } from 'assets/icons/outline/eye-off.svg';
import { ReactComponent as Users } from 'assets/icons/outline/users.svg';

export default function UserSettings() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const currentUser = useSelector((state) => {
    return state.currentUser;
  });

  useAsyncEffect(async () => {
    if (!currentUser) {
      await dispatch(fetchCurrentUser());
    }
  }, []);

  if (!currentUser) {
    return null;
  }

  const {
    email,
    name,
    company,
    public_token: publicToken,
    secret_token: secretToken,
    recaptcha_active: recaptcha,
    allow_list: allow,
    max_sessions_per_ip,
  } = currentUser.attributes;

  const allowList =
    allow.length > 0 ? allow.join(', ') : 'All websites allowed';

  const renderUserInfo = () => {
    return (
      <ul className="menu">
        <p className="window__title">User info</p>
        <li className="menu__item space__bottom-2">
          <Mail />
          <span className="menu__item__label">Email: </span>
          <span className="menu__item__info">{email}</span>
        </li>
        <li className="menu__item space__bottom-2">
          <User />
          <span className="menu__item__label">Name: </span>
          <span className="menu__item__info">{name}</span>
        </li>
        <li className="menu__item space__bottom-2">
          <Building />
          <span className="menu__item__label">Company: </span>
          <span className="menu__item__info">{company}</span>
        </li>
        <li className="menu__item space__bottom-2">
          <Key />
          <span className="menu__item__label">Public API token: </span>
          <span className="menu__item__info">{publicToken}</span>
          <button
            className="menu__item__icon"
            onClick={(e) => {
              e.preventDefault();

              navigator.clipboard.writeText(publicToken);
            }}
          >
            <Copy />
          </button>
          <Tooltip
            id="public-token"
            message="You can use this token in your website to make requests that do not require admin privileges, such as getting buttons info or pressing buttons"
          />
        </li>
        <li className="menu__item space__bottom-2">
          <Finger />
          <span className="menu__item__label">Secret API token: </span>
          <span className="menu__item__info">
            {showSecret ? secretToken : '*'.repeat(secretToken.length)}
          </span>
          <button
            className="menu__item__icon"
            onClick={() => setShowSecret(!showSecret)}
          >
            {showSecret ? <Eye /> : <EyeClosed />}
          </button>
          <Tooltip
            id="secret-token"
            message="This is a secret token to be used only for API requests that require admin privileges, such as 'add-tags', and only coming from a private origin"
          />
        </li>
        <li className="menu__item space__bottom-2">
          <Check />
          <span className="menu__item__label">Allowed websites: </span>
          <span className="menu__item__info">{allowList}</span>
          <Tooltip
            id="allow-list"
            message="Accept only requests coming from these domains. If left blank, accept requests from all domains"
          />
        </li>
        <li className="menu__item space__bottom-2">
          <Shield />
          <span className="menu__item__label">ReCAPTCHA active: </span>
          <span className="menu__item__info">
            {recaptcha ? 'true' : 'false'}
          </span>
          <Tooltip
            id="recaptcha"
            message="To enable ReCAPTCHA insert your secret key here and configure Lyket's Provider in your buttons/script using the ReCAPTCHA site key"
          />
        </li>
        <li className="menu__item space__bottom-2">
          <Users />
          <span className="menu__item__label">
            Max number of sessions per IP:{' '}
          </span>
          <span className="menu__item__info">
            {max_sessions_per_ip ||
              'None, accept an infinite number of sessions per IP'}
          </span>
          <Tooltip
            id="max-sessions"
            message="Lyket assigns an unique session ID to every visitor that presses a button. To avoid misuse we enforce a maximum number of session IDs coming from the same IP. Change this number to allow more or less users per IP"
          />
        </li>
        <div className="center space__top-4">
          <button className="button" onClick={() => setEditMode(true)}>
            Edit settings
          </button>
        </div>
      </ul>
    );
  };

  return (
    <Page>
      <Section>
        <h1 className="section__title">User settings</h1>
        <div className="window space__bottom-6">
          {!editMode && renderUserInfo()}
          {editMode && (
            <SettingsForm
              onClose={(e) => {
                e?.preventDefault();
                setEditMode(false);
              }}
            />
          )}
        </div>
      </Section>
      <Section>
        <h3 className="section__title">Get started</h3>
        <div className="cards--multi">
          <div className="card">
            <div className="card__label">React</div>
            <p className="card__text">
              If you use React you can install our library
            </p>
            <code className="card__code">
              <pre>npm install @lyket/react</pre>
            </code>
            <code className="card__code">
              <pre>yarn add @lyket/react</pre>
            </code>
            <p className="card__text">
              Copy your API key to configure the Provider top-level
            </p>
            <code className="card__code">
              <pre>{`import { Provider } from '@lyket/react';

ReactDOM.render(
  <Provider apiKey="${publicToken}">
    <App />
  </Provider>,
  document.getElementById('root')
);`}</pre>
            </code>
            <span className="menu__item__info">Follow the </span>
            <a
              href="https://lyket.dev/docs/react"
              target="_blank"
              rel="noopener noreferrer"
            >
              official React documentation
            </a>
            <span className="menu__item__info"> to start creating buttons</span>
          </div>
          <div className="card">
            <div className="card__label">HTML</div>
            <p className="card__text">
              If you want to use our HTML embeddable widget you can do it by
              importing Lyket top-level providing your API key
            </p>
            <code className="card__code">
              <pre>{`<script src="https://unpkg.com/@lyket/widget@latest/dist/lyket.js?apiKey=${publicToken}"></script>
`}</pre>
            </code>
            <div className="card__text">
              <span className="menu__item__info">Follow the </span>
              <a
                href="https://lyket.dev/docs/widget"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Widget documentation
              </a>
              <span className="menu__item__info">
                {' '}
                to start creating buttons
              </span>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
