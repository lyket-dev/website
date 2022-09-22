import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RingSpinner } from "react-spinners-kit";
import { useParams } from "react-router-dom";
import {
  fetchAllClapButtons,
  fetchAllLikeButtons,
  fetchAllUpdownButtons,
} from "ducks/buttons";
import useAsyncEffect from "utils/useAsyncEffect";
import { Page, Section } from "components/Page";
import ButtonsImporter from "components/ButtonsImporter";
import { ReactComponent as Refresh } from "assets/icons/outline/refresh.svg";
import Tooltip from "components/Tooltip";
import Table from "components/table";

const fetchMap = {
  like: fetchAllLikeButtons,
  clap: fetchAllClapButtons,
  updown: fetchAllUpdownButtons,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const { type } = useParams();

  const fetchData = useCallback(
    async ({ page = 0, limit = 10, sort = "desc" } = {}) => {
      setLoading(true);
      const buttons = await dispatch(fetchMap[type]({ page, limit, sort }));
      setTotalCount(buttons.meta.total);
      setLoading(false);
    },
    [setLoading, dispatch, type]
  );

  const buttons = useSelector((state) => {
    return Object.values(state.buttons);
  });

  const namespaces = buttons
    .map((b) => b.attributes.namespace)
    .filter((value, index, self) => self.indexOf(value) === index);

  useAsyncEffect(fetchData, [type]);

  const hasButtons = buttons.length > 0;

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
          This Lyket's dashboard, where you can see all statistics related to
          your buttons. However, it seems that you have no buttons at the
          moment!
        </p>

        <p className="card__text">
          You can start creating buttons using HTML, our React Library, or our
          API.
        </p>
        <h4 className="card__title">HTML</h4>
        <p className="card__text">
          <span>
            You can learn how to create buttons using HTML by reading the{" "}
          </span>
          <a
            href="https://lyket.dev/docs/html"
            target="_blank"
            rel="noopener noreferrer"
          >
            official HTML widget documentation.
          </a>
        </p>
        <h4 className="card__title">React</h4>
        <p className="card__text">
          <span>Follow the </span>
          <a
            href="https://lyket.dev/docs/react"
            target="_blank"
            rel="noopener noreferrer"
          >
            official React documentation
          </a>
          <span> to start creating buttons using React.</span>
        </p>
        <div className="flex--start">
          <span className="card__title">Bulk import</span>
          <Tooltip
            id="csv-no-buttons"
            message="Import multiple buttons at once by uploading a CSV file. The CSV must have the following headers: path and amount. It will accept only valid Lyket urls, ie. [button_type]-buttons/[namespace]/[id]"
          />
        </div>
        <p className="card__text">
          If you want to import buttons in bulk, upload a CSV file! The CSV must
          have a <code>path</code> and <code>amount</code> header.{" "}
          <a href="/test-import.csv" download>
            Download an example csv
          </a>
        </p>
        <ButtonsImporter onFinishImporting={fetchData} />
        <div className="space__bottom-1"> </div>
        <p className="card__text ">
          If you already created some buttons but you cannot see them in the
          dashboard yet, hit the refresh button!
        </p>
        <button className="menu__item space__bottom--2" onClick={fetchData}>
          <Refresh />
          <span className="menu__item__label">Refresh buttons!</span>
        </button>
      </div>
    );
  };

  return (
    <Page>
      {!hasButtons && !loading && renderBlankSlate()}
      <Section className={!hasButtons && "blurred"}>
        {loading && !hasButtons && (
          <div className="fixed_center">
            <RingSpinner size={100} color="#201335" />
          </div>
        )}
        {!loading && (
          <Table
            onPaginate={fetchData}
            totalCount={totalCount}
            onFetchData={fetchData}
            namespaces={namespaces}
          />
        )}
      </Section>
    </Page>
  );
}
