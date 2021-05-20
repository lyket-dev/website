import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RingSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import { fetchAll } from "../ducks/buttons";
import useAsyncEffect from "../utils/useAsyncEffect";
import { Page, Section } from "components/sub/Page";
import { Panes, Pane, Menu } from "components/sub/Panes";
import ButtonsTable from "components/sub/ButtonsTable";
import ButtonsImporter from "components/sub/ButtonsImporter";
import "rsuite-table/dist/css/rsuite-table.css";
import { ReactComponent as Folder } from "assets/icons/outline/folder-open.svg";
import { ReactComponent as Refresh } from "assets/icons/outline/refresh.svg";
import { ReactComponent as Upload } from "assets/icons/outline/cloud-upload.svg";
import Tooltip from "./sub/Tooltip";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchAll());
    setLoading(false);
  }, [setLoading, dispatch]);

  const buttons = useSelector((state) => {
    return Object.values(state.buttons);
  });

  const namespaces = buttons
    .map((b) => b.attributes.namespace)
    .filter((value, index, self) => self.indexOf(value) === index);

  useAsyncEffect(fetchData, []);

  const handleClick = () => fetchData();
  const hasButtons = buttons.length > 0;

  const renderBlankSlate = () => {
    return (
      <div className="window">
        <p className="card__bigtext">
          <span aria-label="Hi!" role="img">
            👋
          </span>
        </p>
        <h4 className="card__title">Welcome!</h4>
        <p className="card__text">
          This Lyket's dashboard, where you can see all statistics related to
          your buttons. Anyway, it seems that you have no buttons at the moment!
        </p>

        <p className="card__text">
          You can start creating buttons using HTML, or our React Library.
        </p>
        <h4 className="card__title">HTML</h4>
        <p className="card__text">
          <span>
            You can learn how to create buttons using HTML by reading the{" "}
          </span>
          <a
            href="https://lyket.dev/docs/widget"
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
        <p className="card__text">
          If you just created a button but you cannot see it, hit the refresh
          button!
        </p>
        <div className="center">
          <button className="menu__item" onClick={handleClick}>
            <Refresh />
            <span className="menu__item__label">Refresh buttons!</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <Page>
      <Section>
        {loading && (
          <div className="fixed_center">
            <RingSpinner size={100} color="#201335" />
          </div>
        )}
        {hasButtons && !loading && (
          <Panes minSize={50}>
            <Menu>
              <>
                <ul className="menu space__bottom-4">
                  <li className="menu__item">
                    <Folder />
                    <Link className="menu__item__label" to={`/dashboard`}>
                      All
                    </Link>
                  </li>
                  {namespaces.map((namespace) => {
                    const slug = namespace ? namespace : "no-namespace";
                    return (
                      <li key={slug} className="menu__item">
                        <Folder />
                        <Link
                          className="menu__item__label"
                          to={`/dashboard/${slug}`}
                        >
                          {slug}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <button className="menu__item" onClick={handleClick}>
                  <Refresh />
                  <span className="menu__item__label">Refresh buttons!</span>
                </button>
                <div className="menu__item">
                  <Upload />
                  <span className="menu__item__label">
                    Import buttons & votes
                  </span>
                  <Tooltip
                    id="csv"
                    message="Import multiple buttons at once by uploading a CSV file. The CSV must have the following headers: path and amount. It will accept only valid Lyket urls, ie. [button_type]-buttons/[namespace]/[id]"
                  />
                </div>
                <ButtonsImporter onFinishImporting={fetchData} />
              </>
            </Menu>
            <Pane>
              <ButtonsTable />
            </Pane>
          </Panes>
        )}
        {!hasButtons && !loading && renderBlankSlate()}
      </Section>
    </Page>
  );
}
