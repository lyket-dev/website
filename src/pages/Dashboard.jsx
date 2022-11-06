import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingSpinner } from 'react-spinners-kit';
import { Link } from 'react-router-dom';
import { fetchAllLikeButtons } from 'ducks/buttons';
import useAsyncEffect from 'utils/useAsyncEffect';
import { Page, Section } from 'components/Page';
import ButtonsImporter from 'components/ButtonsImporter';
import { ReactComponent as Refresh } from 'assets/icons/outline/refresh.svg';
import Tooltip from 'components/Tooltip';
import Table from 'components/table';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deactivated, setDeactivated] = useState(false);

  const fetchInitialData = useCallback(
    async ({ page = 0, limit = 10, sort = 'desc' } = {}) => {
      try {
        setLoading(true);

        await dispatch(fetchAllLikeButtons({ page, limit, sort }));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);

        if (error.errors[0].code === 'DEACTIVATED_ACCOUNT') {
          setDeactivated(true);
        } else {
          throw error;
        }
      }
    },
    [setLoading, dispatch],
  );

  const buttons = Object.values(
    useSelector((state) => {
      return state.buttons;
    }),
  );

  useAsyncEffect(fetchInitialData, []);

  const hasButtons = buttons.length > 0;

  const renderDeactivated = () => {
    return (
      <div className="fixed_center">
        <div className="window">
          <p className="card__bigtext">
            <span aria-label="Hi!" role="img">
              🥶
            </span>
          </p>
          <h4 className="card__title">Your account has been deactivated!</h4>
          <p className="card__text">
            Unfortunately, it seems that your account has been deactivated. This
            probably happened because you reached the maximum allowed pageviews
            for your current plan, or your current subscription has expired.
          </p>
          <p className="card__text">
            Please navigate to the{' '}
            <Link to="/user-settings">user settings page</Link> to upgrade to
            another plan or{' '}
            <a href="mailto:write@lyket.dev">contact our support team!</a>
          </p>
        </div>
      </div>
    );
  };

  const renderBlankSlate = () => {
    return (
      <div className="window blank">
        <p className="card__bigtext">
          <span aria-label="Hi!" role="img">
            👋
          </span>
        </p>
        <h4 className="card__title">Welcome!</h4>
        <p className="card__text">
          This is Lyket's dashboard, where you can see all statistics related to
          your buttons. However, it seems that you haven't created any buttons,
          yet!
        </p>
        <h4 className="card__title">Getting started</h4>
        <p className="card__text">
          Creating buttons with Lyket is super easy and it takes the time to
          copy and paste a few lines of code!
        </p>
        <p className="card__text">
          Depending on your tech stack, you can start by using our HTML widget{' '}
          <a
            href="https://lyket.dev/docs/html"
            target="_blank"
            rel="noopener noreferrer"
          >
            (docs)
          </a>
          , the official React Library{' '}
          <a
            href="https://lyket.dev/docs/react"
            target="_blank"
            rel="noopener noreferrer"
          >
            (docs)
          </a>
          , or the API{' '}
          <a
            href="https://lyket.dev/docs/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            (docs)
          </a>
          .
        </p>
        <div className="flex--start">
          <span className="card__title">Bulk import</span>
          <Tooltip
            id="csv-no-buttons"
            message="Import multiple buttons at once by uploading a CSV file. The CSV must have the following headers: path and amount. It will accept only valid Lyket urls, ie. [button_type]-buttons/[namespace]/[id]"
          />
        </div>
        <p className="card__text">
          If you want to import buttons in bulk or set a specific number for the
          counter, you can upload buttons trough a CSV file. The CSV must have a{' '}
          <code>path</code> and <code>amount</code> header and contain the
          necessary info to create a button. Read more about creating buttons,{' '}
          <a
            href="https://lyket.dev/docs/html"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          , or{' '}
          <a href="/test-import.csv" download>
            download an example CSV
          </a>
          .
        </p>
        <ButtonsImporter onFinishImporting={fetchInitialData} />
        <div className="space__bottom-1"> </div>
        <p className="card__text ">
          If you already created some buttons but you cannot see them in the
          dashboard yet, hit the refresh button!
        </p>
        <button
          className="menu__item space__bottom--2"
          onClick={fetchInitialData}
        >
          <Refresh />
          <span className="menu__item__label">Refresh buttons!</span>
        </button>
      </div>
    );
  };

  return (
    <Page>
      {loading && !hasButtons && !deactivated && (
        <div className="fixed_center">
          <RingSpinner size={100} color="#201335" />
        </div>
      )}
      <Section className={(!hasButtons || deactivated) && 'blurred'}>
        {!loading && <Table />}
      </Section>
      {!hasButtons && !loading && !deactivated && renderBlankSlate()}
      {deactivated && renderDeactivated()}
    </Page>
  );
}
