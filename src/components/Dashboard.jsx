import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll } from "../ducks/buttons";
import useAsyncEffect from "../utils/useAsyncEffect";
import { Page, Section } from "components/sub/Page";
import { Panes, Pane, Menu } from "components/sub/Panes";
import ButtonsTable from "components/sub/ButtonsTable";
import "rsuite-table/dist/css/rsuite-table.css";
import { ReactComponent as Folder } from "assets/icons/outline/folder-open.svg";
import { ReactComponent as Refresh } from "assets/icons/outline/refresh.svg";

export default function Dashboard() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(fetchAll());
  };

  const namespaces = useSelector((state) => {
    return Object.values(state.buttons)
      .map((b) => b.attributes.namespace)
      .filter((value, index, self) => self.indexOf(value) === index);
  });

  useAsyncEffect(fetchData, []);

  const handleClick = () => fetchData();

  return (
    <Page>
      <Section>
        <Panes minSize={50}>
          <Menu>
            <>
              <p className="space__bottom-2 menu__item__label">Namespace</p>

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
            </>
          </Menu>
          <Pane>
            <ButtonsTable />
          </Pane>
        </Panes>
      </Section>
    </Page>
  );
}
